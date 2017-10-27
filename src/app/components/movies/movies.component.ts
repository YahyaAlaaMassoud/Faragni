import { Component, OnInit } from '@angular/core';

//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'

//models
import { Movie } from '../../models/movie.model'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor() {
    this.movies = [];
  }

  ngOnInit() {
    this.movies = JSON.parse(localStorage.getItem('movies'));
    console.log(this.movies)
  }

}
