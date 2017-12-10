import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../../../../models/movie.model';
import { User } from '../../../../models/user.model';
import { Genre } from '../../../../models/genre.model';
import { Recommendation } from '../../../../models/recommendation.model';
import { OmdbMoviesService } from '../../../../services/omdb/omdb-movies.service';
import { UserService } from '../../../../services/user/user.service';
import { MovieService } from '../../../../services/movie/movie.service';

@Component({
  selector: 'recommendation-thumbnail',
  templateUrl: './recommendation-thumbnail.component.html',
  styleUrls: ['./recommendation-thumbnail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecommendationThumbnailComponent implements OnInit {

  @Input() currentRecommendation: Recommendation;
  @Input() readOnly: boolean;
  currentRecommendingUser: User;
  currentMovie: Movie;
  currentUser: User;
  imdbPath: string;
  

  constructor(private omdb: OmdbMoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private movieService: MovieService) 
  { 
    this.currentUser = new User();
    this.currentRecommendingUser = new User();
    this.currentMovie = new Movie();
  }
  
  ngOnInit() {
    this.getCurrentUser();
    this.getRecommendingUser();
    this.getCurrentMovie();
    if(this.currentRecommendation.UserRating === null)
      this.currentRecommendation.UserRating = 0;
  }

  getCurrentMovie() {
    this.movieService.getById(this.currentRecommendation.MovieID)
                      .subscribe(
                        res => {
                          this.currentMovie = res;
                          this.imdbPath = "http://www.imdb.com/title/" + this.currentMovie.imdbID + "/";                              
                          console.log(res)
                        },
                        error => {
                          console.log('Error: ' + error)
                        }
                      )
  }

  getRecommendingUser() {
    this.userService.getById(this.currentRecommendation.ByUserID)
                    .subscribe(
                      res => {
                        this.currentRecommendingUser = res;
                        console.log(res)
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
    else
      this.currentUser = this.route.snapshot.data['user'];
  }

  saveRecommendationRating(e){
    this.currentRecommendation.UserRating = e.rating;
    this.userService.updateRecommendation(this.currentRecommendation.RecommendationID, this.currentRecommendation)
                    .subscribe(
                      res => {
                        console.log('updated')
                        console.log(res)
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  goToProfile(){
    this.router.navigate(['/profile', this.currentRecommendingUser.UserID.toString(), "1"])
  }
}
