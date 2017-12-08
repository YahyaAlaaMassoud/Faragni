import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { User } from '../../../models/user.model';
import { Movie } from '../../../models/movie.model';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.scss']
})
export class RatedMoviesComponent implements OnInit {

  currentUser: User;
  ratedMovies: Movie[];

  constructor(private omdb: OmdbMoviesService, 
              private userService: UserService, 
              private route: ActivatedRoute,
              private router:Router) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.currentUser);
    this.ratedMovies = [];
    
   }

   ngOnInit() {
      this.getCurrentUser();
     
    }

    getCurrentUser(){
      if(this.route.snapshot.data['user'] === null)
        this.router.navigate(['/404']);
  // // console.log(this.isLoggedInUser)
      else{
        this.currentUser = this.route.snapshot.data['user'];
        this.getRatedMovies();
      }
    }

   getRatedMovies() {
     this.currentUser.MovieRatings = this.currentUser.MovieRatings || [];
     this.currentUser.MovieRatings.forEach(item => {
       if (item.Rating > 0) {
        //  console.log(item.MovieID);
        this.omdb.getMovieByImdbID(item.MovieID)
          .subscribe(
            res => {
              const cur: Movie = <Movie>res;
              console.log(cur);
              this.ratedMovies.push(cur);
            },
            error => {
              // console.log('Error: ', error);
            }
          );      
       }
     });
   }



}
