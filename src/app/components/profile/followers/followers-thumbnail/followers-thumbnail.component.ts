import { Component, OnInit, ViewEncapsulation, Input , EventEmitter ,Output} from '@angular/core';
import { User } from '../../../../models/user.model';
//<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->

import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../services/user/user.service';
// /users/:id/follows_me
// /users/:id/follows_him
@Component({
  selector: 'app-followers-thumbnail',
  templateUrl: './followers-thumbnail.component.html',
  styleUrls: ['./followers-thumbnail.component.css']
})
export class FollowersThumbnailComponent implements OnInit {
  
  @Input() currentFollower:User;

  
  isFolloowing:boolean;
  //        <!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->

  constructor(private router: Router,private userService: UserService) { 
    
    
  }

  ngOnInit() {
        this.isFollowingUser();
        //console.log("hnaaaaaaaaaaa  " + this.isFolloowing );
  }
  goToProfile(){
    this.router.navigate(['/profile', this.currentFollower.UserID]);
  }

  unfollowUser(){
    this.userService.unfollowUser(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        this.isFolloowing = false;
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  followUser(){
    this.userService.followUser(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        this.isFolloowing = true;
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  isFollowingUser() {
    this.userService.isFollowing(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        console.log(res);
                        this.isFolloowing = res.following_him ;
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }
}
