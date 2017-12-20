import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  followingList: User[];
  currentUser: User;
  authUser: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { 
    this.followingList = []
    this.currentUser = new User();
    this.authUser = new User();
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getAuthUser();
    this.getFollowings();  
  }

  getAuthUser(){
    this.authUser = this.route.snapshot.data['authUser']
  }

  getCurrentUser(){
    this.currentUser = this.route.snapshot.data['user'];
  }

  getFollowings() {
    this.followingList = this.currentUser.Following;
  }
  
  refreshList(e){
    this.followingList = e;
  }
}

