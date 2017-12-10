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

  followingList:User[];
  currentUser:User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { 
    // this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    // this.followingList = this.currentUser.Following;
    // console.log(this.followingList);
  }
  ngOnInit() {
    this.getCurrentUser();
    this.getFollowings();
    
  }
  getCurrentUser(){
    if(this.route.snapshot.data['user'] === null)
      this.router.navigate(['/404']);
    else
      this.currentUser = this.route.snapshot.data['user'];
  }
  getFollowings() {
      this.userService.getFollowingsForAuthenticatedUser()
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

