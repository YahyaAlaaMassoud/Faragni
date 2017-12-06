import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private omdb: OmdbMoviesService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.watchlistMovies = [];
    this.getWatchListMovies();
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
            console.log('Error: ', error);
          }
        );
     });
   }

  ngOnInit() {
  }

}
