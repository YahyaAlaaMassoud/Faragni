import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../../../../models/movie.model';
import { User } from '../../../../models/user.model';
import { Genre } from '../../../../models/genre.model';
import { Recommendation } from '../../../../models/recommendation.model';
import { OmdbMoviesService } from '../../../../services/omdb/omdb-movies.service';

@Component({
  selector: 'recommendation-thumbnail',
  templateUrl: './recommendation-thumbnail.component.html',
  styleUrls: ['./recommendation-thumbnail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecommendationThumbnailComponent implements OnInit {

  @Input() currentRecommendation: Recommendation;
  currentRecommendingUser: User;
  currentMovie: Movie;
  users: User[];
  currentUser: User;
  imdbPath: string;
  readOnly: boolean;

  constructor(private omdb: OmdbMoviesService,
              private route: ActivatedRoute,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.readOnly = true;
  }

  getMovie(id: string) {
        this.omdb.getMovieByImdbID(id)
        .subscribe(
          res => {
            const cur: Movie = <Movie>res;
            // console.log(cur);
            this.currentMovie = cur;
            this.imdbPath = "http://www.imdb.com/title/" + this.currentMovie.imdbID + "/"                  
            this.exctractGenres();
          },
          error => {
            console.log('Error: ', error);
          }
        );
  }

  updateUsersList(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const index: number = users
      .findIndex(item => item.UserID === user.UserID);
    users[index] = user;
    console.log('tamam')
    localStorage.setItem('users', JSON.stringify(users));
  }

  ngOnInit() {
    this.getCurrentUser();
    // let cur: User = JSON.parse(localStorage.getItem('currentUser'));
    // cur.Recommended.forEach(item=>{
    //   item.UserRating = 0;
    // })
    // localStorage.setItem('currentUser', JSON.stringify(cur));
    // this.updateUsersList(cur)




    // console.log(this.currentRecommendation)
    this.users = JSON.parse(localStorage.getItem('users'));
    const index: number = this.users
      .findIndex(user => user.UserID === this.currentRecommendation.ByUserID);
    this.currentRecommendingUser = (this.users[index]);
    this.getMovie(this.currentRecommendation.MovieID);

    
    // console.log(this.currentRecommendingUser.profilePic)
  }

  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
// // console.log(this.isLoggedInUser)
    this.currentUser = this.route.snapshot.data['user'];
    if(this.currentUser === JSON.parse(localStorage.getItem('currentUser')))
      this.readOnly = false;
  }

  saveRecommendationRating(e){
    const index: number = this.currentUser.Recommended
      .findIndex(rec => rec.MovieID === this.currentMovie.imdbID);
    this.currentRecommendation.UserRating = e.rating;
    console.log(this.currentRecommendation)
    console.log(index)
    this.currentUser.Recommended[index] = this.currentRecommendation
    console.log(this.currentUser.Recommended)
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.updateUsersList(this.currentUser);
    console.log(this.currentUser)
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

  goToProfile(){
    this.router.navigate(['/profile', this.currentRecommendingUser.UserID])
  }
}
