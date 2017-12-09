import { Component, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { User } from '../../../../models/user.model';
import { Output } from '@angular/core/src/metadata/directives';
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
  isFollowing:boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.isFollowingUser();
  }

  unfollowUser(){
    this.userService.unfollowUser(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        this.isFollowing = false;
                      }
                    )
  }

  followUser(){
    this.userService.followUser(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        console.log(res);
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
                        this.isFollowing = res.follows_me;
                        console.log(this.isFollowing + ' ' + this.currentFollower.FirstName)
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  isFollower(){
    console.log('hena')
    this.userService.isFollower(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        this.isFollowing = !res;
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
    // var bt = (<HTMLInputElement>document.getElementById("mybt"));
    // if(this.isFollowing)
    // {
    //     bt.value = "unfollow";
    //     bt.click = function(){this.unfollowUser();}
    // }
    // else
    // {
    //     bt.value = "follow";
    //     bt.click = function(){this.followUser();}
    // }
  }
}
