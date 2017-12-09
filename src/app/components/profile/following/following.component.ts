import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  followingList:User[];
  currentUser:User;

  constructor() { 
    // this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    // this.followingList = this.currentUser.Following;
    // console.log(this.followingList);
  }
  ngOnInit() {
    
  }

}

