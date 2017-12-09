import { Component, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { User } from '../../../../models/user.model';
import { Output } from '@angular/core/src/metadata/directives';
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
  isFollowing:boolean;
  //        <!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->

  constructor(private router: Router,private userService: UserService) { 
    this.isFollowing = false;

  }

  ngOnInit() {
        this.isFollowingUser();

//     const index: number = this.currentUser.Following
//     .findIndex(item => item.UserID === this.currentFollower.UserID)
//     if(index!=-1)
//     {
//      this.isFollowing = true;
//     }
  }
  goToProfile(){
    this.router.navigate(['/profile', this.currentFollower.UserID]);
  
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
