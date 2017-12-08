import { Component, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-followers-thumbnail',
  templateUrl: './followers-thumbnail.component.html',
  styleUrls: ['./followers-thumbnail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FollowersThumbnailComponent implements OnInit {
  @Input() friend:User;
  currentUser:User;
  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // console.log(this.friend)
  }
  unfollowUser(){
    const index: number = this.currentUser.Friends
    .findIndex(item => item.UserID === this.friend.UserID);
    this.currentUser.Friends.splice(index,1);
  }
}
