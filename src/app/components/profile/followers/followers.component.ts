import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';



@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  followersList:User[];
  currentUser:User;
  followingList:User[];
  constructor(private route: ActivatedRoute,
              private router: Router,
               private userService: UserService) { 

  }
  ngOnInit() {
    this.followersList = [];
    this.followingList = [];
    this.getCurrentUser();
    this.getFollowers();
    this.getFollowings();
  }
  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
    else
      this.currentUser = this.route.snapshot.data['user'];
  }
  getFollowers() {
      this.userService.getFollowersForUser(this.currentUser.UserID)
                      .subscribe(
                        res=> {
                          this.followersList = res
                          console.log(this.followersList);
                        },
                        error=>{
                          console.log('Error: '+error); 
                        }
                      );
  }
  getFollowings() {
    this.userService.getFollowingsForUser(this.currentUser.UserID)
                    .subscribe(
                      res=> {
                        this.followingList = res
                        console.log(this.followingList);
                      },
                      error=>{
                        console.log('Error: '+error); 
                      }
                    );
  }
  
  refreshList(e){
    this.followingList = e;
  }
}
