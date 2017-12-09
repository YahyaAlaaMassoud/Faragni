import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { User } from '../../../models/user.model';
import { Movie } from '../../../models/movie.model';
import { Rating } from '../../../models/rating.model';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { UserService } from '../../../services/user/user.service';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.scss']
})
export class RatedMoviesComponent implements OnInit {

  currentUser: User;
  ratings: Rating[];
  ratedMovies: Movie[];

  constructor(private omdb: OmdbMoviesService, 
              private userService: UserService, 
              private route: ActivatedRoute,
              private router:Router,
              private movieService: MovieService) {
    this.ratedMovies = [];
    this.ratings = [];
   }

   ngOnInit() {
      this.getCurrentUser();
      this.getRatings();
    }

    getCurrentUser(){
      if(this.route.snapshot.data['user'] === null)
        this.router.navigate(['/404']);
      else
        this.currentUser = this.route.snapshot.data['user'];
    }

    getMovieByID(id: number){
      this.movieService.getById(id) 
                       .subscribe(
                         res => {
                           this.ratedMovies.push(res);
                           console.log(res)
                         },
                         error => {
                           console.log('Error: ' + error)
                         }
                       )
    }

    getRatings() {
      this.userService.getRatingsForUser(this.currentUser.UserID)
                      .subscribe(
                        res => {
                          this.ratings = res;
                          this.ratings.forEach(rating => {
                            this.getMovieByID(rating.MovieID)
                          })
                        },
                        error => {
                          console.log('Error: ' + error)
                        }
                      )
    }

    refreshList(e){
      this.ratedMovies = this.ratedMovies.filter(item => item.MovieID !== e);
    }
}
