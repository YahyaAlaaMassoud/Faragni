import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { Movie } from '../../../models/movie.model';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { UserService } from '../../../services/user/user.service';

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
    this.getWatchListMovies();
  }

  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
    else
      this.currentUser = this.route.snapshot.data['user'];
  }

  constructor(private omdb: OmdbMoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
      this.watchlistMovies = [];
  }

   getWatchListMovies() {
     this.userService.getWatchlist()
                     .subscribe(
                       res => {
                         this.watchlistMovies = res || []
                         console.log(res)
                       },
                       error => {
                         console.log('Error: ' + error)
                       }
                     )
    //  this.currentUser.WatchList = this.currentUser.WatchList  || [];
    //  this.watchlistMovies = [];
    //  this.currentUser.WatchList.forEach(item => {
    //     this.omdb.getMovieByImdbID(item)
    //     .subscribe(
    //       res => {
    //         const cur: Movie = <Movie>res;
    //         this.watchlistMovies.push(cur);
    //       },
    //       error => {
    //         console.log('Error: ', error);
    //       }
    //     );
    //  });
   }

}
