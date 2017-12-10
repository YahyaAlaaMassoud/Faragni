import { MovieService } from '../../services/movie/movie.service';
import { User } from '../../models/user.model';

import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

// animations
import { fadeInAnimation } from '../../animations/fade-in.animation';

// models
import { Movie } from '../../models/movie.model';
import { Genre } from '../../models/genre.model';
import { PagerService } from '../../services/pager/pager.service';
import { GenreService } from '../../services/genre/genre.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [fadeInAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@fadeInAnimation]': '' }
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = []
  dumMovies: Movie[];
  displayedMovies: Movie[];
  moviesSortedByRate: Movie[];
  moviesSortedByDate: Movie[];
  genres: string[];
  diffGenres: Set<string>;
  pager: any = {}
  pagedItems: Movie[];
  last: Movie;
  selectedPage: number = 1;
  searchable: string;
  selectedValue: number;

  constructor(private location: Location, 
              private pagerService: PagerService,
              private movieService: MovieService,
              private genreService: GenreService) {
    this.movies = [];
    this.searchable = "";
    this.displayedMovies = [];
    this.dumMovies = [];
    this.genres = [];
    this.selectedValue = 0
  }

  ngOnInit() {
    this.getMovies();
    this.getGenres();
    
    // this.location.replaceState('/movies');

    this.pagedItems = [];    
  }

  search(e){
    this.dumMovies = []
    console.log(e)
    e.forEach(item => {
      let index = this.movies.findIndex(m => m.MovieID === item.value.valueExpr)
      this.dumMovies.push(this.movies[index])
    })
    this.setPage(this.pager.currentPage, this.dumMovies.length)
  }

  selectMovie(e){
    this.dumMovies = []
    let index = this.movies.findIndex(m => m.MovieID === e)
    this.dumMovies.push(this.movies[index])
    this.selectedValue = e;
    this.setPage(this.pager.currentPage, this.dumMovies.length)
  }

  getMovieByID(id: number) {
    this.movieService.getById(id) 
                     .subscribe(
                       res => {
                         this.dumMovies.push(res)
                       }
                     )
  }

  getMovies() {
    this.movieService.getAll()
                     .subscribe(
                       res => {
                        this.movies = res;
                        this.displayedMovies = res;
                        this.dumMovies = res;
                        this.setPage(1, this.movies.length)
                       },
                       error => {
                        //  console.log('Error: ' + error)
                         this.movies = [];
                         this.displayedMovies = [];
                         this.dumMovies = [];
                       }
                     )
  }

  setPage(page: number, length: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(length, page);

    // get current page of items
    this.pagedItems = this.dumMovies.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // console.log(this.pagedItems)
}

  sortByRating(){
    this.dumMovies.sort(function(a, b){
      if(a.imdbRating < b.imdbRating){
          return 1;
      }
      else if(a.imdbRating > b.imdbRating){
          return -1;
      }
      else{
          return 0;
      }
    })
    this.setPage(this.pager.currentPage, this.dumMovies.length)
  }

  sortByDate(){
    this.dumMovies.sort(function(a, b){
      var aDate = new Date(a.ReleaseDate);
      var bDate = new Date(b.ReleaseDate);
      if(aDate < bDate){
          return 1;
      }
      else if(aDate > bDate){
          return -1;
      }
      else{
          return 0;
      }
    })
    this.setPage(this.pager.currentPage, this.dumMovies.length)
  }

  getGenres(){
    this.genreService.getAll()
                     .subscribe(
                       res => {
                         this.genres = res;
                        //  console.log(res)
                       },
                       error => {
                        //  console.log('Error: ' + error)
                         this.genres = []
                       }
                     )
  }

  filterByGenres(e){
    this.selectedValue = 0    
    if(e.length === 0){
      console.log(this.movies)
      this.dumMovies = this.movies;
      console.log(this.dumMovies)
      this.setPage(1, this.dumMovies.length)
    }
    else{
      this.displayedMovies = [];
      let diffMovies = new Set<Movie>();
        this.movies.forEach(movie => {
          let ok: boolean = true;
          e.forEach(genre => {
            ok = ok && movie.Genre.includes(genre);
          })
          if(ok && !diffMovies.has(movie)){
            this.displayedMovies.push(movie);
            diffMovies.add(movie);
          }
        })
      this.dumMovies = this.displayedMovies;
      this.setPage(this.pager.currentPage, this.dumMovies.length)
    }
  }

}