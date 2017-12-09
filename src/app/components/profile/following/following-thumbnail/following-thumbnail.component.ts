import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { User } from '../../../../models/user.model';
import { Output } from '@angular/core/src/metadata/directives';
//<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-following-thumbnail',
  templateUrl: './following-thumbnail.component.html',
  styleUrls: ['./following-thumbnail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FollowingThumbnailComponent implements OnInit {

  @Input() currentFollowing:User;
  currentUser:User;

  //<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->
  
  constructor(private router: Router) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {

  }
  updateUsersList(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const index: number = users
      .findIndex(item => item.UserID === user.UserID);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }
  goToProfile(){
    this.router.navigate(['/profile', this.currentFollowing.UserID]);
  }
  unfollowUser(){
    const index: number = this.currentUser.Following
    .findIndex(item => item.UserID === this.currentFollowing.UserID)
    //this.currentUser.Followers.splice(index,1)
    this.currentUser.Following = this.currentUser.Following.filter(item=>item.UserID!=this.currentFollowing.UserID);
    console.log(this.currentUser.Following);
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    this.updateUsersList(this.currentUser);
  }

}
