import { Component, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { User } from '../../../../models/user.model';
import { Output } from '@angular/core/src/metadata/directives';
//<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-followers-thumbnail',
  templateUrl: './followers-thumbnail.component.html',
  styleUrls: ['./followers-thumbnail.component.css']
})
export class FollowersThumbnailComponent implements OnInit {
  @Input() currentFollower:User;
  currentUser:User;
  isFollowing:boolean;
  //        <!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->

  constructor(private router: Router) { 
    //console.log(this.currentFollower.UserID);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isFollowing = false;
  }
  ngOnInit() {
    const index: number = this.currentUser.Following
    .findIndex(item => item.UserID === this.currentFollower.UserID)
    if(index!=-1)
    {
     this.isFollowing = true;
    }
  }
  goToProfile(){
    this.router.navigate(['/profile', this.currentFollower.UserID]);
  }
  updateUsersList(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const index: number = users
      .findIndex(item => item.UserID === user.UserID);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }
  unfollowUser(){
    const index: number = this.currentUser.Following
    .findIndex(item => item.UserID === this.currentFollower.UserID)
    //this.currentUser.Followers.splice(index,1)
    this.currentUser.Following = this.currentUser.Following.filter(item=>item.UserID!=this.currentFollower.UserID);
    console.log(this.currentUser.Following);
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    this.updateUsersList(this.currentUser);
  }
  followUser(){
    this.currentUser.Following.push(this.currentFollower);
    console.log(this.currentUser.Following);
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    this.updateUsersList(this.currentUser);
  }
  // followOrFollowing(){
  //   var bt = (<HTMLInputElement>document.getElementById("mybt"));
  //   if(this.isFollowing)
  //   {
  //       bt.value = "unfollow";
  //       bt.click = function(){this.unfollowUser();}
  //   }
  //   else
  //   {
  //       bt.value = "follow";
  //       bt.click = function(){this.followUser();}
  //   }
  // }
  
}
