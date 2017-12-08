import { Component, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { User } from '../../../models/user.model';
import { Output } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-followers-thumbnail',
  templateUrl: './followers-thumbnail.component.html',
  styleUrls: ['./followers-thumbnail.component.css']
})
export class FollowersThumbnailComponent implements OnInit {
  @Input() follower:User;
  currentUser:User;


  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
  }
  unfollowUser(){
    console.log(this.currentUser.Followers);
    const index: number = this.currentUser.Followers
    .findIndex(item => item.UserID === this.follower.UserID)
    //this.currentUser.Followers.splice(index,1)
    this.currentUser.Followers = this.currentUser.Followers.filter(item=>item.UserID!=this.follower.UserID);
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    console.log(this.currentUser.Followers);
  }
}
