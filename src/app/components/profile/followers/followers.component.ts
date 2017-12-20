import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  @Output() currentUserModel = new EventEmitter<User>();
  currentUser:User;  
  followersList:User[];
  followingList:User[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { 
    this.followersList = [];
    this.followingList = [];
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getFollowers();
    this.getFollowings();
  }

  getCurrentUser(){
    this.currentUser = this.route.snapshot.data['user'];
  }

  getFollowers() {
    this.followersList = this.currentUser.Followers;
  }

  getFollowings() {
    this.followingList = this.currentUser.Following;    
  }
  
  refreshList(e){
    this.followingList = e;
  }

  authUserChanged(e) {
    this.route.snapshot.data['authUser'] = e;
    this.currentUserModel.emit(e)
  }
}
