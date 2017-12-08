import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  friendList:User[];
  currentUser:User;
  constructor() { 
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    this.friendList = this.currentUser.Friends;
    // console.log(this.friendList);
  }


  ngOnInit() {
  }

}
