import { Recommendation } from '../../../models/recommendation.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { Movie } from '../../../models/movie.model';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  currentUser: User;
  recommendedMovies: Movie[];
  recommendingUsers: User[];
  users: User[];


  pendingRecommendations: Recommendation[];
  ratedRecommendations: Recommendation[];

  updateUsersList(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const index: number = users
      .findIndex(item => item.UserID === user.UserID);
    users[index] = user;
    // console.log('tamam')
    localStorage.setItem('users', JSON.stringify(users));
  }

  ngOnInit() {
    this.getCurrentUser();   
    this.currentUser.Recommended = this.currentUser.Recommended || [];   
    
    // console.log(this.currentUser.Recommended) 
    this.users = JSON.parse(localStorage.getItem('users'));
    
    
    this.pendingRecommendations = [];
    this.ratedRecommendations = [];
    
    
    this.currentUser.Recommended.forEach(rec=>{
      if(rec.UserRating == 0 || rec.UserRating == undefined)
        this.pendingRecommendations.push(rec)
      else
        this.ratedRecommendations.push(rec)
    }) 
  }

  constructor(private omdb: OmdbMoviesService,
              private route: ActivatedRoute,
              private router: Router) {

    
    // this.recommendedMovies = [];
    // this.recommendingUsers = [];
    // this.getRecommendedMovies();
    // this.getRecommendingUsers();
  }

  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
// // console.log(this.isLoggedInUser)
    this.currentUser = this.route.snapshot.data['user'];
  }

  getRecommendedMovies() {
    this.currentUser.Recommended = this.currentUser.Recommended || [];
    this.currentUser.Recommended.forEach(item => {
        this.omdb.getMovieByImdbID(item.MovieID)
        .subscribe(
          res => {
            const cur: Movie = <Movie>res;
            // console.log(cur);
            this.recommendedMovies.push(cur);
          },
          error => {
            console.log('Error: ', error);
          }
        );
    });
  }

  getRecommendingUsers(){
    this.currentUser.Recommended = this.currentUser.Recommended || [];
    this.currentUser.Recommended.forEach(item => {
      const index: number = this.users
      .findIndex(user => user.UserID === item.ByUserID);
      this.recommendingUsers.push(this.users[index]);
    });
  }



}
