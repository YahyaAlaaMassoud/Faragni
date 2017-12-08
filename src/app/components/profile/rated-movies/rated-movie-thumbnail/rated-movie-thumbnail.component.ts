import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Movie } from '../../../../models/movie.model';
import { Genre } from '../../../../models/genre.model';
import { Actor } from '../../../../models/actor.model';
import { User } from '../../../../models/user.model';
import { Rating } from '../../../../models/rating.model';

@Component({
  selector: 'app-rated-movie-thumbnail',
  templateUrl: './rated-movie-thumbnail.component.html',
  styleUrls: ['./rated-movie-thumbnail.component.scss']
})
export class RatedMovieThumbnailComponent implements OnInit {

  @Input() currentMovie: Movie;
  currentUser: User;
  addedToList: boolean;
  currentMovieRating: Rating;
  modalId: string;
  imdbPath: string;
  readOnly: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {
      this.readOnly = true;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.exctractGenres();
    this.exctractActors();
    this.getCurrentUser();
    this.setMovieRating();
    this.setWatchListMovie();
    this.modalId = this.currentMovie.imdbID + "ratedMovie"
    this.imdbPath = "http://www.imdb.com/title/" + this.currentMovie.imdbID + "/"      
    
    // console.log(this.currentMovieRating);
    // console.log(this.currentUser);
  }

  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
// // console.log(this.isLoggedInUser)
    this.currentUser = this.route.snapshot.data['user'];
    if(this.currentUser === JSON.parse(localStorage.getItem('currentUser')))
      this.readOnly = false;
  }

  saveNewRating(e) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const index = this.currentUser.MovieRatings
      .findIndex(item => item.MovieID === this.currentMovie.imdbID);
    this.currentUser.MovieRatings[index].Rating = e.rating;
    this.currentMovieRating.Rating = e.rating;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.updateUsersList(this.currentUser);
    // console.log(index + ' ' + e.rating);
    // console.log('fi eh');
  }

  //remove this one
  // getCurrentUser() {
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   // this.currentUser.WatchList = [];
  //   // this.currentUser.MovieRatings = [];
  //   // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  //   // this.updateUsersList(this.currentUser);
  //   // console.log(this.currentUser);
  // }

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
    } else {
      // console.log(index)
      // console.log(this.currentUser.MovieRatings[index].MovieID)
      this.currentMovieRating = this.currentUser.MovieRatings[index];
      // console.log(index + ' ' + this.currentMovieRating.Rating);
    }
    // // console.log(this.currentMovieRating);
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

}
