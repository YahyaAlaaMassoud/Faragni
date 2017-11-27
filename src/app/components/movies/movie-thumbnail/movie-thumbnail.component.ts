import { Component, OnInit, Input } from '@angular/core';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { Movie } from '../../../models/movie.model';
import { Rating } from '../../../models/rating.model';
import { Genre } from '../../../models/genre.model';
import { Actor } from '../../../models/actor.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {

    @Input() currentMovie: Movie;
    flip: boolean;
    addedToList: boolean;
    photo: string;
    list: Movie[] = [];
    cur: Movie;
    currentUser: User;
    currentMovieRating: Rating;

    constructor(private omdb: OmdbMoviesService) {
      this.flip = false;
      /*let s = new ss();
      let sss = "hamada";
      s.sss = "hamoo";
      console.log(s.sss)
      console.log(typeof(s.sss))
      /*this.list = JSON.parse(localStorage.getItem('movies'))
      let i:number = 0;
      let j:number = 0;
      for(i; i < this.list.length; i++){
        for(j = i + 1; j < this.list.length; j++){
          if(this.list[j].imdbID === this.list[i].imdbID){
            this.list.splice(j, 1)
          }
        }
      }
      console.log(this.list.length)
      /*localStorage.setItem('movies', JSON.stringify(this.list))*/
      /*this.omdb.getMovieByImdbID("tt0102926")
      .subscribe(
        res => {
          this.cur = <Movie>res;

          this.list = JSON.parse(localStorage.getItem('movies'))

          console.log(this.list)
          this.list.push(this.cur)
          localStorage.setItem('movies', JSON.stringify(this.list))
        },
        error => {
          console.log("Error: ", error);
        }
      );*/
    }

    getMovieByID(id: string) {
      this.omdb.getMovieByImdbID(id)
            .subscribe(
              res => {
                this.cur = <Movie>res;
                this.currentMovie = this.cur;
                console.log(this.currentMovie);
              },
              error => {
                console.log("Error: ", error);
              }
            );
    }

    ngOnInit() {
      // console.log("hamadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      // console.log(this.currentMovie.imdbRating)
      this.exctractGenres();
      this.exctractActors();
      this.getCurrentUser();
      this.setMovieRating();
      this.setWatchListMovie();
      this.photo = `url(${this.currentMovie.Poster})`;
    }

    setWatchListMovie() {
      if (this.currentUser.WatchList) {
        const index: number = this.currentUser.WatchList
          .findIndex(item => item === this.currentMovie.imdbID);
        if (index !== -1) {
          this.addedToList = true;
        } else {
          this.addedToList = false;
        }
      }
    }

    updateUsersList(user: User) {
      const users: User[] = JSON.parse(localStorage.getItem('users'));
      const index: number = users
        .findIndex(item => item.UserID === user.UserID);
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }

    setMovieRating() {
      // console.log(this.currentUser.MovieRatings);
      const index: number = this.currentUser.MovieRatings
       .findIndex(item => item.MovieID === this.currentMovie.imdbID);
      if (index === -1 || this.currentUser.MovieRatings.length === 0) {
        this.currentMovieRating = new Rating();
        this.currentMovieRating.MovieID = this.currentMovie.imdbID;
        this.currentMovieRating.Rating = 0;
        this.currentMovieRating.UserID = this.currentUser.UserID;
        this.currentUser.MovieRatings.push(this.currentMovieRating);
        // console.log('hhhh')
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.updateUsersList(this.currentUser);
      }
      else {
        // console.log(index)
        // console.log(this.currentUser.MovieRatings[index].MovieID)
        this.currentMovieRating = this.currentUser.MovieRatings[index];
        // console.log(index + ' ' + this.currentMovieRating.Rating);
      }
      // // console.log(this.currentMovieRating);
    }

    saveNewRating(e) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const index = this.currentUser.MovieRatings
        .findIndex(item => item.MovieID === this.currentMovie.imdbID);
      this.currentUser.MovieRatings[index].Rating = e.rating;
      this.currentMovieRating.Rating = e.rating;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.updateUsersList(this.currentUser);
      console.log(index + ' ' + e.rating);
      // console.log('fi eh');
    }

    getCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // this.currentUser.WatchList = [];
      // this.currentUser.MovieRatings = [];
      // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      // this.updateUsersList(this.currentUser);
      // console.log(this.currentUser);
    }

    exctractGenres() {
      this.currentMovie.Genres = [];
      const li = this.currentMovie.Genre.split(', ');
      li.forEach((gn, index) => {
        const gnr: Genre = new Genre();
        gnr.Name = gn;
        this.currentMovie.Genres.push(gnr);
      });
      // console.log(li)
    }

    exctractActors() {
      this.currentMovie.ActorsList = [];
      const li = this.currentMovie.Actors.split(', ');
      li.forEach((ac, index) => {
          const actr: Actor = new Actor();
          actr.Name = ac;
          this.currentMovie.ActorsList.push(actr);
      });
      // console.log(li)
    }

    addToWatchList() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.addedToList === true) {
        this.addedToList = false;
        const index: number = this.currentUser.WatchList
         .findIndex(item => item === this.currentMovie.imdbID);
        this.currentUser.WatchList.splice(index, 1);
        console.log('sheel');
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        console.log(this.currentUser.WatchList);
      }
      else if (this.addedToList === false) {
        this.addedToList = true;
        console.log('7ot');
        this.currentUser.WatchList.push(this.currentMovie.imdbID);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        console.log(this.currentUser.WatchList);
      }
      this.updateUsersList(this.currentUser);
    }
}
