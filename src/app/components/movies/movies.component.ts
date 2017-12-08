import { User } from '../../models/user.model';

import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

// animations
import { fadeInAnimation } from '../../animations/fade-in.animation';

// models
import { Movie } from '../../models/movie.model';
import { Genre } from '../../models/genre.model';
import { PagerService } from '../../services/pager/pager.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [fadeInAnimation],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@fadeInAnimation]': '' }
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  dumMovies: Movie[];
  displayedMovies: Movie[];
  moviesSortedByRate: Movie[];
  moviesSortedByDate: Movie[];
  moviesSortedByAwards: Movie[];
  genres: string[];
  diffGenres: Set<string>;
  open: boolean;


  constructor(private location: Location, private pagerService: PagerService) {
    this.movies = [];
    this.dumMovies = [];
    this.open = false;
    this.diffGenres = new Set();
    this.genres = [];
  }

  ngOnInit() {
    this.movies = JSON.parse(localStorage.getItem('movies'));
    this.displayedMovies = JSON.parse(localStorage.getItem('movies'));
    this.dumMovies = JSON.parse(localStorage.getItem('movies'));
    // console.log(this.movies);
    this.location.replaceState('/movies');

    //this.sortByRating();
    //this.sortByDate();

    this.getGenres();
    this.pagedItems = [];

    this.setPage(1)
  }

  
  pager: any = {}
  pagedItems: Movie[];

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.movies.length, page);

    // get current page of items
    this.pagedItems = this.dumMovies.slice(this.pager.startIndex, this.pager.endIndex + 1);

    console.log(this.pagedItems)
}

  sortByRating(){
    //this.moviesSortedByRate = JSON.parse(localStorage.getItem('movies'));
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
    this.setPage(this.pager.currentPage)
  }

  last:Movie;
  selectedPage:number = 1;

  sortByDate(){
    //this.moviesSortedByDate = JSON.parse(localStorage.getItem('movies'));
    this.dumMovies.sort(function(a, b){
      var aDate = new Date(a.Released);
      var bDate = new Date(b.Released);
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
    this.setPage(this.pager.currentPage)
  }

  getGenres(){
    this.movies.forEach(movie=>{
      const li = movie.Genre.split(', ');
      li.forEach(genre=>{
        if(!this.diffGenres.has(genre)){
          this.diffGenres.add(genre);
          this.genres.push(genre);
        }
      })
    })
  }

  hh(e){
    console.log(e)
    if(!e.length){
      this.dumMovies = this.movies;
      this.setPage(this.pager.currentPage)
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
      this.setPage(this.pager.currentPage)
    }
  }

}