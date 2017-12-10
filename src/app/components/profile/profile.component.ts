import { ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
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
              private cdRef: ChangeDetectorRef) {
    //   this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 

    //   this.louda = new User();
    //   this.user1 = new User();
    //   this.user2 = new User();
    //   this.currentUser.Email="khaledawaled@live.com";
    //   this.currentUser.Age = 21;
    //   this.currentScreen = 0;
      this.isEdit = false;
      this.isLoggedInUser = false;
      //-------Tabs------//
      this.showFollowers = false;
      this.showRatedMovies = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = false;

      this.loggedUser = new User();
    //   this.currentUser.Friends=[]
    //  // this.currentUser.Friends.push(this.currentUser);
    //    localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    //   // console.log(this.currentUser.Friends);
    //   this.user2.FirstName = "waleed";
    //   this.user2.LastName = "elnaser";
    //   this.user2.bio = "ana raye7 fen ";
    //   this.user2.profilePic_url = this.currentUser.profilePic_url;
    //   this.louda.bio="hamada ra7 wa magash";
    //   this.louda.FirstName = "louda";
    //   this.louda.LastName = "hamada";
    //   this.louda.profilePic_url = this.currentUser.profilePic_url;
    //   this.louda.UserID = 2 ; 
    //   this.user1.UserID = 3 ; 
    //   this.user2.UserID = 4 ;
    //   this.user1.FirstName = "tftf";
    //   this.user1.LastName = "2f2f";
    //   this.user1.bio = "hanafy comes first";
    //   this.user1.profilePic_url = this.currentUser.profilePic_url;
    //   this.currentUser.Followers=[];
    //   this.currentUser.Followers.push(this.louda);
    //   this.currentUser.Followers.push(this.user1);
    //   this.currentUser.Following=[];
    //   this.currentUser.Following.push(this.user2);
    //   localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    //   console.log(this.currentUser.Followers);
  }

  ngOnInit() {
    let usr: User = this.route.snapshot.data['user'];
    let tab: number = +this.route.snapshot.paramMap.get("tab");
    let currentScreen: number = +this.route.snapshot.paramMap.get("screen");
    this.chooseTab(tab);
    this.currentUser = usr;
    console.log(this.currentUser.UserID)
    this.fullName = this.currentUser.FirstName + ' ' + this.currentUser.LastName;
    this.currentUser.bio = "ana esmy hamada";

    this.getAuthenticatedUser();
    this.isFollowedUser()
    this.changeMeOnUpdate();
    
    if(usr === null){
      this.router.navigate(['/404']);
    }
    else{
      
      // this.isLoggedInUser = (this.loggedUser.UserID === usr.UserID) ? true : false;
      
      // if(!this.isLoggedInUser){
      //   let ok: boolean = false;
      //   this.currentUser.Following = this.currentUser.Following || [];
      //   this.currentUser.Following.forEach(usr =>{
      //     if(usr.UserID === id){
      //       ok = true;
      //     }
      //   })
      //   this.isFollowed = ok;
      // }
      
      // this.getUserByID(usr.UserID);
    }

    let scr: number = +this.route.snapshot.paramMap.get('screen')
    this.chooseTab(scr)
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
                      console.log(this.loggedUser.UserID)
                      this.isLoggedInUser = (this.loggedUser.UserID == this.currentUser.UserID) ? true : false;
                      this.noAccess = !this.isLoggedInUser;
                      console.log(this.loggedUser)
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
                        console.log(this.currentUser)
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
