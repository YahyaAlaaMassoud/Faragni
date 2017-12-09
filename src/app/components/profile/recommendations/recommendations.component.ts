import { Recommendation } from '../../../models/recommendation.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { Movie } from '../../../models/movie.model';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  currentUser: User;
  pendingRecommendations: Recommendation[];
  ratedRecommendations: Recommendation[];

  ngOnInit() {
    this.getCurrentUser();
    this.getPendingRecommendations();
    this.getRatedRecommendations();
  }

  constructor(private omdb: OmdbMoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.pendingRecommendations = [];
    this.ratedRecommendations = [];
  }

  getPendingRecommendations() {
    this.userService.getRecommendationsByStatus("pending")
                    .subscribe(
                      res => {
                        this.pendingRecommendations = res;
                        console.log(res)
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  getRatedRecommendations() {
    this.userService.getRecommendationsByStatus("rated")
                    .subscribe(
                      res => {
                        this.ratedRecommendations = res;
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
}
