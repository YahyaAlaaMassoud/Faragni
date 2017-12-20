import { Component, OnInit, Input, OnChanges, SimpleChange, Output, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { User } from '../../../models/user.model';
import { Movie } from '../../../models/movie.model';
import { Rating } from '../../../models/rating.model';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { UserService } from '../../../services/user/user.service';
import { MovieService } from '../../../services/movie/movie.service';
import "rxjs/add/operator/takeWhile";
import { AfterContentInit, AfterContentChecked, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.scss']
})
export class RatedMoviesComponent implements OnInit, OnDestroy {

    currentUser: User;
    @Output() currentUserModel = new EventEmitter<User>();

    @Input() loggedUserID: number;
    ratedMovies: Movie[];
    alive: boolean = true;

    constructor(private omdb: OmdbMoviesService, 
                private userService: UserService, 
                private route: ActivatedRoute,
                private router:Router,
                private movieService: MovieService) {
      this.ratedMovies = [];
    }

    ngOnInit() {  
      this.currentUser = this.route.snapshot.data['user']   
      // console.log(this.currentUser)
      this.ratedMovies = []
      this.changeMeOnUpdate();
      this.getRatings();
    }

    ngOnDestroy() {
      this.alive = false;
      $('#ratedMovies').fadeTo('slow', 0);
    }

    changeMeOnUpdate(){
      let curTab = +this.route.snapshot.paramMap.get("tab");
      let curUserID = this.currentUser.UserID;
      this.route
          .params
          .takeWhile(() => this.alive)
          .subscribe(params => {
            this.currentUser = this.route.snapshot.data['user'];
            this.ratedMovies = [];
            this.getRatings();
            // if(+this.route.snapshot.paramMap.get("tab") != curTab){
            //   this.getRatings();
            // }
            // else if(curUserID != this.currentUser.UserID){
            //   this.getRatings();
            // }
            // else if(+this.route.snapshot.paramMap.get("tab") == curTab 
            //         && curUserID == this.currentUser.UserID
            //         ){
            //           console.log(this.ratedMovies.length)
            // }
          })
    }

    getMovieByID(id: number){
      this.movieService.getById(id) 
                       .takeWhile(() => this.alive)
                       .subscribe(
                         res => {
                           const index: number = this.ratedMovies
                            .findIndex(m => m.MovieID == id);
                           if(index == -1)
                            this.ratedMovies.push(res);
                         },
                         error => {
                           console.log('Error: ' + error)
                         }
                       )
    }

    getRatings() {
      this.ratedMovies = []
      this.currentUser.MovieRatings.forEach(rate => {
        this.getMovieByID(rate.MovieID)
      })
    }

    refreshList(e){
      this.ratedMovies = this.ratedMovies.filter(item => item.MovieID !== e);
    }

    userChanged(e){
      // console.log(e)
      this.currentUser = e;
      this.route.snapshot.data['user'] = e;
      this.currentUserModel.emit(this.currentUser)
    }
}
