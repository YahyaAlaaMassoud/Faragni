import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Movie } from '../../../../models/movie.model';
import { Genre } from '../../../../models/genre.model';
import { Actor } from '../../../../models/actor.model';
import { User } from '../../../../models/user.model';
import { Rating } from '../../../../models/rating.model';
import { UserService } from '../../../../services/user/user.service';
import { MovieService } from '../../../../services/movie/movie.service';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-rated-movie-thumbnail',
  templateUrl: './rated-movie-thumbnail.component.html',
  styleUrls: ['./rated-movie-thumbnail.component.scss']
})
export class RatedMovieThumbnailComponent implements OnInit {

  currentUser: User;
  @Output() currentUserModel = new EventEmitter<User>();

  @Input() currentMovie: Movie;
  @Input() componentID: number;
  @Input() loggedUserID: number;

  @Output() watchlistDatasource = new EventEmitter<Movie[]>();  
  @Output() ratedMoviesDatasource = new EventEmitter<number>();  
  
  addedToList: boolean;
  currentMovieRating: Rating;
  modalId: string;
  imdbPath: string;
  readOnly: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private movieService: MovieService,
              private toast: ToasterService) {
      this.readOnly = false;
  }

  createNewRating() {
    this.currentMovieRating = new Rating();
    this.currentMovieRating.MovieID = this.currentMovie.MovieID;
    this.currentMovieRating.UserID = this.currentUser.UserID;
    this.currentMovieRating.Review = "";
    this.currentMovieRating.Rating = 0;
  }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['user']
    this.exctractGenres();
    this.exctractActors();
    this.checkAuthUser();
    this.createNewRating();
    this.getUserRatings();
    this.modalId = this.currentMovie.imdbID + "ratedMovie"
    this.imdbPath = "http://www.imdb.com/title/" + this.currentMovie.imdbID + "/";
  }

  checkAuthUser(){
    if(this.loggedUserID !== this.currentUser.UserID)
      this.readOnly = true;
  }

  getUserRatings() {
    this.currentUser.MovieRatings.forEach(item => {
      if(item.MovieID === this.currentMovie.MovieID){
        this.currentMovieRating.RatingID = item.RatingID;
        this.currentMovieRating.Rating = item.Rating;
      }
    })
  }

  saveNewRating(e) {
    if(this.currentMovieRating.Rating === 0){
      this.currentMovieRating.Rating = e.rating;
      this.userService.rateMovie(this.currentMovieRating)
                      .subscribe(
                        res => {
                          // console.log(res)
                          this.currentMovieRating.RatingID = res.RatingID
                          this.currentUser.MovieRatings.push(this.currentMovieRating)
                          this.currentUserModel.emit(this.currentUser)
                          var toast: any = {
                            type: 'success',
                            title: 'Thank you for rating ' + this.currentMovie.Title + '!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        },
                        error => {
                          // console.log('Error: ' + error)
                          var toast: any = {
                            type: 'error',
                            title: 'Sorry, an error has happened!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        }
                      )
    }
    else{
      this.currentMovieRating.Rating = e.rating;
      this.userService.updateRating(this.currentMovieRating.RatingID, this.currentMovieRating)
                      .subscribe(
                        res => {
                          // console.log(res)
                          let index: number = this.currentUser.MovieRatings
                              .findIndex(r => r.RatingID === this.currentMovieRating.RatingID)
                          this.currentUser.MovieRatings[index] = res;
                          this.currentUserModel.emit(this.currentUser)
                          var toast: any = {
                            type: 'info',
                            title: 'The rating for movie ' + this.currentMovie.Title + ' has been changed!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        },
                        error => {
                          // console.log('Error: ' + error)
                          var toast: any = {
                            type: 'error',
                            title: 'Sorry, an error has happened!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        }
                      )
    }
  }

  removeRatingOrWatchlist() {
    if(this.componentID == 1){
      this.userService.deleteRating(this.currentMovieRating.RatingID)
                      .subscribe(
                        res => {
                          this.ratedMoviesDatasource.emit(this.currentMovieRating.MovieID)
                          let index: number = this.currentUser.MovieRatings
                            .findIndex(r => r.RatingID === this.currentMovieRating.RatingID)
                          this.currentUser.MovieRatings.splice(index, 1)
                          this.currentUserModel.emit(this.currentUser)
                          var toast: any = {
                            type: 'info',
                            title: 'The rating for movie ' + this.currentMovie.Title + ' has been removed!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        },
                        error => {
                          var toast: any = {
                            type: 'error',
                            title: 'Sorry, an error has happened!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        }
                      )
    }
    else{
      this.movieService.removeFromWatchlist(this.currentMovie.MovieID)
                      .subscribe(
                        res => {
                          // console.log(res)
                          this.watchlistDatasource.emit(res);
                          let index: number = this.currentUser.WatchList
                              .findIndex(m => m.MovieID === this.currentMovie.MovieID)
                          this.currentUser.WatchList.splice(index, 1)
                          this.currentUserModel.emit(this.currentUser)
                          var toast: any = {
                            type: 'info',
                            title: 'The watchlist movie ' + this.currentMovie.Title + ' has been removed!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        },
                        error => {
                          // console.log('Error: ' + error)
                          var toast: any = {
                            type: 'error',
                            title: 'Sorry, an error has happened!',
                            timeout: 2500
                          };
                          this.toast.pop(toast)
                        }
                      )
    }
  }
  
  exctractGenres() {
    this.currentMovie.Genres = [];
    const li = this.currentMovie.Genre.split(', ');
    li.forEach((gn, index) => {
      const gnr: Genre = new Genre();
      gnr.Name = gn;
      this.currentMovie.Genres.push(gnr);
    });
  }

  exctractActors() {
    this.currentMovie.ActorsList = [];
    const li = this.currentMovie.Actors.split(', ');
    li.forEach((ac, index) => {
        const actr: Actor = new Actor();
        actr.Name = ac;
        this.currentMovie.ActorsList.push(actr);
    });
  }

}
