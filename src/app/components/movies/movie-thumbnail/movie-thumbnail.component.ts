import { Component, OnInit, Input } from '@angular/core';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { FormControl, NgControl } from '@angular/forms';
// import { MatInput, MatFormField, MatAutocomplete } from '@angular/material'
import { Movie } from '../../../models/movie.model';
import { Rating } from '../../../models/rating.model';
import { Genre } from '../../../models/genre.model';
import { Actor } from '../../../models/actor.model';
import { User } from '../../../models/user.model';
import { Recommendation } from '../../../models/recommendation.model';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { UserService } from '../../../services/user/user.service';
import { MovieService } from '../../../services/movie/movie.service';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

declare var $: any;

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
    toggleSendButton: boolean;
    recommendation: Recommendation;
    pageDimmedOnRate: boolean;
    pageDimmedOnRecommendation: boolean;
    imdbPath: string;

    users: User[];

    constructor(private omdb: OmdbMoviesService,
                private userService: UserService,
                private movieService: MovieService) {
      this.flip = false;
      this.toggleSendButton = false;
      this.pageDimmedOnRate = false;
      this.pageDimmedOnRecommendation = false;
      this.currentUser = new User();
    }

    ngOnInit() {
      this.recommendation = new Recommendation();      
      this.currentMovieRating = new Rating();
      this.currentMovieRating.Rating = 0;
      this.currentMovieRating.MovieID = this.currentMovie.MovieID;
      this.currentMovieRating.Review = "";  
      this.getCurrentUser();      
      this.getUserRatings();
      this.checkWatchlist();
      this.exctractGenres();
      this.exctractActors();
      this.photo = `url(${this.currentMovie.Poster})`;
      this.imdbPath = "http://www.imdb.com/title/" + this.currentMovie.imdbID + "/";
      this.getAllUsers();      
    }

    checkWatchlist(){
      this.userService.getWatchlist()
                      .subscribe(
                        res => {
                          let ok: boolean = false;
                          res.forEach(movie => {
                            this.addedToList = 
                                  this.addedToList || (movie.MovieID === this.currentMovie.MovieID);
                          })
                        }
                      )
    }

    getAllUsers(){
      this.userService.getAll()
                      .subscribe(
                        res => {
                          this.users = res;
                          console.log(res)
                        },
                        error => {
                          console.log('Error: ' + error)
                        }
                      )
    }

    getUserRatings() {
      this.userService.getRatingsForCurrentUser() 
                      .subscribe(
                        res => {
                          this.currentUser.MovieRatings = res;
                          console.log(res)
                          this.currentUser.MovieRatings.forEach(item => {
                            if(item.MovieID === this.currentMovie.MovieID){
                              this.currentMovieRating.Rating = item.Rating;
                              this.currentMovieRating.RatingID = item.RatingID;                              
                            }
                          })
                        },
                        error => {
                          console.log('Error: ' + error)
                        }
                      )
    }

    saveNewRating(e) {
      if(this.currentMovieRating.Rating === 0){
        this.currentMovieRating.Rating = e.rating;
        this.userService.rateMovie(this.currentMovieRating)
                        .subscribe(
                          res => {
                            console.log(res)
                            this.currentMovieRating.RatingID = res.RatingID
                          },
                          error => {
                            console.log('Error: ' + error)
                          }
                        )
      }
      else{
        this.currentMovieRating.Rating = e.rating;
        this.userService.updateRating(this.currentMovieRating.RatingID, this.currentMovieRating)
                        .subscribe(
                          res => {
                            console.log(res)
                          },
                          error => {
                            console.log('Error: ' + error)
                          }
                        )
      }
    }

    removeRating() {
      this.userService.deleteRating(this.currentMovieRating.RatingID)
                      .subscribe(
                        res => {
                          console.log(res)
                          this.currentMovieRating.Rating = 0;
                        },
                        error => {
                          console.log('Error: ' + error)
                        }
                      )
    }

    getCurrentUser() {
      this.userService.getAuthenticatedUser()
                      .subscribe(
                        res => {
                          this.currentUser = res;
                          this.currentMovieRating.UserID = res.UserID;
                          console.log(res)
                        },
                        error => {
                          console.log('Error: ' + error)
                        }
                      )
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

    toggleWatchList() {
      console.log(this.currentMovie.MovieID)
      if(!this.addedToList) {
        this.movieService.addToWatchlist(this.currentMovie.MovieID)
                        .subscribe(
                          res => {
                            console.log(res)
                            this.addedToList = true;
                          },
                          error => {
                            console.log('Error: ' + error)
                          }
                        )
      }
      else{
        this.movieService.removeFromWatchlist(this.currentMovie.MovieID)
                        .subscribe(
                          res => {
                            console.log(res)
                            this.addedToList = false;
                          },
                          error => {
                            console.log('Error: ' + error)
                          }
                        )
      }
    }

    newRecommendation() {
      this.recommendation = new Recommendation();
      this.recommendation.ByUserID = this.currentUser.UserID;
      this.recommendation.MovieID = this.currentMovie.MovieID;
      this.recommendation.ToUserID = 0;
      this.recommendation.ExpectedRating = 0;
      this.recommendation.Message = "";
    }

    saveRecommendationRating(e){
      this.recommendation.ExpectedRating = e.rating;
    }

    sendRecommendation(){
      if(this.recommendation.ExpectedRating && this.recommendation.ToUserID && this.recommendation.Message.length){
        this.userService.recommendToUser(this.recommendation.ToUserID, this.recommendation)
                        .subscribe(
                          res => {
                            console.log(res)
                            console.log('success')
                            $(`#${this.currentMovie.imdbID}`).modal('toggle');                            
                          },
                          error => {
                            console.log('Error: ' + error)
                          }
                        )
      }
      else{
        console.log('fail')
      }
    }
}
