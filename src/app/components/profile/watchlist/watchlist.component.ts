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
  @Output() currentUserModel = new EventEmitter<User>();

  @Input() loggedUserID: number;
  watchlistMovies: Movie[];

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['user']
    this.getWatchListMovies();
  }

  constructor(private omdb: OmdbMoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
      this.watchlistMovies = [];
  }

  getWatchListMovies() {
    this.watchlistMovies = this.currentUser.WatchList
  }

  userChanged(e){
    this.currentUser = e;
    this.route.snapshot.data['user'] = e;
    this.currentUserModel.emit(this.currentUser)
  }
}
