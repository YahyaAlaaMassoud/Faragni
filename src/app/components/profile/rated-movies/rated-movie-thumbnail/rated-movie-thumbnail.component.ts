import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Movie } from '../../../../models/movie.model';
import { Genre } from '../../../../models/genre.model';
import { Actor } from '../../../../models/actor.model';
import { User } from '../../../../models/user.model';
import { Rating } from '../../../../models/rating.model';
import { UserService } from '../../../../services/user/user.service';
import { MovieService } from '../../../../services/movie/movie.service';

@Component({
  selector: 'app-rated-movie-thumbnail',
  templateUrl: './rated-movie-thumbnail.component.html',
  styleUrls: ['./rated-movie-thumbnail.component.scss']
})
export class RatedMovieThumbnailComponent implements OnInit {

  @Input() currentMovie: Movie;
  @Input() componentID: number;

  @Output() watchlistDatasource = new EventEmitter<Movie[]>();  
  @Output() ratedMoviesDatasource = new EventEmitter<number>();  
  
  currentUser: User;
  addedToList: boolean;
  currentMovieRating: Rating;
  modalId: string;
  imdbPath: string;
  readOnly: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private movieService: MovieService) {
      this.readOnly = false;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.currentMovieRating = new Rating();
    this.currentMovieRating.MovieID = this.currentMovie.MovieID;
    this.currentMovieRating.UserID = this.currentUser.UserID;
    this.currentMovieRating.Review = "";
    this.currentMovieRating.Rating = 0;
    this.getAuthUser();
    this.exctractGenres();
    this.exctractActors();
    this.getUserRatings();
    this.modalId = this.currentMovie.imdbID + "ratedMovie"
    this.imdbPath = "http://www.imdb.com/title/" + this.currentMovie.imdbID + "/";
  }

  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
    else
      this.currentUser = this.route.snapshot.data['user'];
  }

  getAuthUser(){
    this.userService.getAuthenticatedUser()
                    .subscribe(
                      res => {
                        if(res.UserID !== this.currentUser.UserID){
                          this.readOnly = true;
                          console.log('leh')
                        }
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  getUserRatings() {
    this.userService.getRatingsForUser(this.currentUser.UserID) 
                    .subscribe(
                      res => {
                        this.currentUser.MovieRatings = res;
                        console.log(res)
                        this.currentUser.MovieRatings.forEach(item => {
                          if(item.MovieID === this.currentMovie.MovieID){
                            this.currentMovieRating.RatingID = item.RatingID;
                            this.currentMovieRating.Rating = item.Rating;
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

  removeRatingOrWatchlist() {
    if(this.componentID == 1){
      this.userService.deleteRating(this.currentMovieRating.RatingID)
                      .subscribe(
                        res => {
                          console.log(res)
                          this.ratedMoviesDatasource.emit(this.currentMovieRating.MovieID)
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
                          this.watchlistDatasource.emit(res);
                        },
                        error => {
                          console.log('Error: ' + error)
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
