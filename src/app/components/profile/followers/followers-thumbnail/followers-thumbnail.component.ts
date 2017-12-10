import { Component, OnInit, ViewEncapsulation, Input , EventEmitter, Output, OnChanges, SimpleChange} from '@angular/core';
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
  
  @Input() currentFollower: User;
  @Input() currentFollowings: User[];
  authenticatedUser: User;
  currentUser: User;
  isFollowing:boolean;
  isAllowed: boolean;

  constructor(private router: Router, 
              private userService: UserService,
              private route: ActivatedRoute) { 
    this.authenticatedUser = new User();
    this.currentFollowings = []
    this.currentUser = new User()
  }

  ngOnInit() {
    let usr: User = new User;
    this.currentUser = this.route.snapshot.data['user'] || usr;
    this.getAuthUser();
    this.isFollowing = false;
    for(let i: number = 0; i < this.currentFollowings.length; i++){
      if(this.currentFollowings[i].UserID == this.currentFollower.UserID){
        this.isFollowing = true;
        break;
      }
    }
  }

  getAuthUser() {
    this.userService.getAuthenticatedUser()
                    .subscribe(
                      res => {
                        this.authenticatedUser = res;
                        if(res.UserID == this.currentUser.UserID)
                          this.isAllowed = true;
                        else
                          this.isAllowed = false;
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if(changes['currentFollowings'] !== undefined){
      this.currentFollowings = changes['currentFollowings'].currentValue || []
      this.isFollowing = false;
      for(let i: number = 0; i < this.currentFollowings.length; i++){
        if(this.currentFollowings[i].UserID == this.currentFollower.UserID){
          this.isFollowing = true;
          break;
        }
      }
    }
  }

  goToProfile(){
    this.router.navigate(['/profile', this.currentFollower.UserID.toString(), 1]);
  }

  unfollowUser(){
      this.userService.unfollowUser(this.currentFollower.UserID)
                      .subscribe(
                        res => {
                          this.isFollowing = false;
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
                        this.isFollowing = true;
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
                        this.isFollowing = res.following_him ;
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }
}
