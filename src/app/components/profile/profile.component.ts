import { ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { Event, document } from 'angular-bootstrap-md/utils/facade/browser';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  currentUser: User;
  loggedUser: User;  
  isEdit: boolean;
  myBio: String;
  showFollowers: boolean;
  showRatedMovies: boolean;
  showWatchlistMovies: boolean;
  showRecommendedMovies: boolean;
  showFollowing: boolean;
  currentScreen:number;
  isLoggedInUser: boolean;
  isFollowed: boolean;
  fullName: string;
  louda: User;
  user1: User;
  user2: User;
  noAccess: boolean;

  constructor(private router:Router, 
              private route: ActivatedRoute, 
              private userService: UserService,
              private cdRef: ChangeDetectorRef) 
  {
      this.isEdit = false;
      this.isLoggedInUser = false;
      //-------Tabs------//
      this.showFollowers = false;
      this.showRatedMovies = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = false;

      this.loggedUser = new User();
  }

  ngOnInit() {
    let usr: User = this.route.snapshot.data['user'];
    if(usr === null){
      this.router.navigate(['/404']);
    }
    else{
      let tab: number = +this.route.snapshot.paramMap.get("tab");
      let currentScreen: number = +this.route.snapshot.paramMap.get("screen");
      this.currentUser = usr;
      this.fullName = this.currentUser.FirstName + ' ' + this.currentUser.LastName;

      this.getAuthenticatedUser();
      this.isFollowedUser()
      this.changeMeOnUpdate();

      let scr: number = +this.route.snapshot.paramMap.get('screen')
      this.chooseTab(scr)
    }
  }

  getUserByID(id: number){
    this.userService.getById(id)
                    .subscribe( 
                    res => {
                      this.currentUser = res;
                    },
                    error => {
                      console.log("error: " + error)
                    }
                  )
  }

  getAuthenticatedUser() {
    this.userService.getAuthenticatedUser()
                    .subscribe( 
                    res => {
                      this.loggedUser = res;
                      // console.log(this.loggedUser.UserID)
                      this.isLoggedInUser = (this.loggedUser.UserID == this.currentUser.UserID) ? true : false;
                      this.noAccess = !this.isLoggedInUser;
                      // console.log(this.loggedUser)
                    },
                    error => {
                      console.log("error: " + error)
                    }
                  )
  }

  updateUserInfo(){
    this.userService.update(this.currentUser)
                    .subscribe(
                      res=>{
                        this.currentUser = res;
                        this.loggedUser = res;
                      },
                      error => {
                        console.log("error: " + error)
                      }
                    )
  }

  changeMeOnUpdate(){
    this.route
        .params
        .subscribe(params => {
          this.chooseTab(params['tab'])
          this.userService.getById(params['id'])
          .subscribe(res=>{
            if(res === null){
              this.router.navigate(['/404']);
            }
            else{
              this.currentUser = res;
              this.isLoggedInUser = (this.loggedUser.UserID == this.currentUser.UserID) ? true : false;
              this.noAccess = !this.isLoggedInUser;  
              window.scrollTo(0,0);
            }
          })
        })
    }

  takeAction(e) {
    this.isEdit = !this.isEdit;
    if(this.isEdit){
      e.textContent = "Save";
    }
    else{
      this.updateUserInfo();
      this.getAuthenticatedUser();
      e.textContent = "Edit profile";
    }
  }

  chooseScreen(e) {
    console.log("my scree : " + e);
    this.currentScreen = e; 
  }

  onFileChange(fileInput: any) {
    this.currentUser.profilePic_url = fileInput.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.currentUser.profilePic_url = e.target.result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
  } 

  isFollowedUser() {
    this.userService.isFollowing(this.currentUser.UserID)
                    .subscribe(
                      res => {
                        this.isFollowed = res.follows_me;
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  chooseTab(id: number){
    console.log(id);
    if(id == 1){
      this.showRatedMovies = true;
      this.showFollowers = false;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = false ;
    }
    else if(id == 2){
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = true;
      this.showRecommendedMovies = false;
      this.showFollowing = false ;
    }
    else if(id == 4){
      this.showRatedMovies = false;
      this.showFollowers = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = false ;
    }
    else if(id == 5){
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = false;
      this.showFollowing = false ;       
      this.showRecommendedMovies = true;
    }
    else if(id == 6)
    {
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = true ; 
    }
  }

  follow(){
    this.userService.followUser(this.currentUser.UserID).subscribe(

                res => {
                  console.log(res);
                  this.isFollowed = false;
                },
                error =>{
                  console.log("error: " + error);
                }
                

    )
  }

  unfollow(){
    this.userService.unfollowUser(this.currentUser.UserID).subscribe(
                      res => {
                        console.log(res);
                       this.isFollowed = true
                      },
                      error =>{
                        console.log("error: " + error);
                      }  )
  }
}
