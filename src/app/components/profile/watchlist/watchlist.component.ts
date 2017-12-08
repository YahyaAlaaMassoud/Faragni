import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { Movie } from '../../../models/movie.model';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';

@Component({
  selector: 'watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  currentUser: User;
  watchlistMovies: Movie[];

  ngOnInit() {
    this.getCurrentUser();
    this.watchlistMovies = [];
    this.getWatchListMovies();
  }

  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
// console.log(this.isLoggedInUser)
    this.currentUser = this.route.snapshot.data['user'];
  }

  constructor(private omdb: OmdbMoviesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

   getWatchListMovies() {
     this.currentUser.WatchList = this.currentUser.WatchList  || [];
     this.currentUser.WatchList.forEach(item => {
        this.omdb.getMovieByImdbID(item)
        .subscribe(
          res => {
            const cur: Movie = <Movie>res;
            // console.log(cur);
            this.watchlistMovies.push(cur);
          },
          error => {
            // console.log('Error: ', error);
          }
        );
     });
   }

}
