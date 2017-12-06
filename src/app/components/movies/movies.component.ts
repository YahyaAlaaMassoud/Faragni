import { User } from '../../models/user.model';

import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

// animations
import { fadeInAnimation } from '../../animations/fade-in.animation';

// models
import { Movie } from '../../models/movie.model';
import { Genre } from '../../models/genre.model';

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
  displayedMovies: Movie[];
  moviesSortedByRate: Movie[];
  moviesSortedByDate: Movie[];
  moviesSortedByAwards: Movie[];
  genres: string[];
  diffGenres: Set<string>;
  open: boolean;

  constructor(private location: Location) {
    this.movies = [];
    this.open = false;
    this.diffGenres = new Set();
    this.genres = [];
  }

  ngOnInit() {
    this.movies = JSON.parse(localStorage.getItem('movies'));
    this.displayedMovies = JSON.parse(localStorage.getItem('movies'));
    // console.log(this.movies);
    this.location.replaceState('/movies');

    //this.sortByRating();
    //this.sortByDate();

    this.getGenres();
  }

  sortByRating(){
    //this.moviesSortedByRate = JSON.parse(localStorage.getItem('movies'));
    this.displayedMovies.sort(function(a, b){
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
  }

  last:Movie;
  selectedPage:number = 1;

  sortByDate(){
    //this.moviesSortedByDate = JSON.parse(localStorage.getItem('movies'));
    this.displayedMovies.sort(function(a, b){
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
      this.displayedMovies = this.movies;
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
    }
  }

}