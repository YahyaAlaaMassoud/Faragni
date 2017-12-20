import { ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
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
  isFollowing: boolean;
  fullName: string;
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
      this.currentUser = new User();
  }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['user'];
    this.loggedUser = this.route.snapshot.data['authUser'];
    
    if(this.currentUser === null){
      this.router.navigate(['/404']);
    }
    else{
      // console.log('curr: ' + this.currentUser.UserID + ' logged: ' + this.loggedUser.UserID)      
      this.fullName = this.currentUser.FirstName + ' ' + this.currentUser.LastName;

      
      this.changeMeOnUpdate();

      
    }
  }

  changeMeOnUpdate(){
    this.route
        .params
        .subscribe(params => {
          console.log(this.route.snapshot.data['user'])
          let res = this.route.snapshot.data['user']
          if(res === null){
            this.router.navigate(['/404']);
          }
          else{
            this.currentUser = res;            
            this.isLoggedInUser = (this.loggedUser.UserID == this.currentUser.UserID) ? true : false;
            if(!this.isLoggedInUser)
              this.chooseTab(1)

            if(!this.isLoggedInUser){
              const index: number = this.loggedUser.Following
                .findIndex(f => f.UserID == this.currentUser.UserID);
              if(index == -1)
                this.isFollowing = false;
              else this.isFollowing = true;
            }
            this.noAccess = !this.isLoggedInUser;  
            document.querySelector('.maindiv').scrollIntoView({ 
              behavior: 'smooth' 
            });
            let tab: number = +this.route.snapshot.paramMap.get("tab");
            this.chooseTab(tab)
          }
        })
    }

  updateUserInfo(){
    this.userService.update(this.currentUser)
                    .subscribe(
                      res=>{
                        this.currentUser = res;
                        this.route.snapshot.data['user'] = res;                        
                        this.loggedUser = res;
                        // console.log('curr: ' + this.currentUser.UserID + ' logged: ' + this.loggedUser.UserID)      
                      },
                      error => {
                        console.log("error: " + error)
                      }
                    )
  }

  takeAction(e) {
    this.isEdit = !this.isEdit;
    if(this.isEdit){
      document.querySelector('.maindiv').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
    else{
      console.log(e)
      if(e.textContent != "Cancel"){
        this.updateUserInfo();
        document.querySelector('.maindiv').scrollIntoView({ 
          behavior: 'smooth' 
        });
        // console.log('curr: ' + this.currentUser.UserID + ' logged: ' + this.loggedUser.UserID)      
      }
    }
  }

  chooseScreen(e) {
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

  chooseTab(id: number){
    if(id == 1){
      document.querySelector('.maindiv').scrollIntoView({ 
        behavior: 'smooth' 
      });   
      this.router.navigate(['/profile', this.currentUser.UserID.toString(), "1" ]);            
      this.showRatedMovies = true;
      this.showFollowers = false;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = false ;
    }
    else if(id == 2){
      document.querySelector('.maindiv').scrollIntoView({ 
        behavior: 'smooth' 
      });   
      this.router.navigate(['/profile', this.currentUser.UserID.toString(), "2" ]);                  
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = true;
      this.showRecommendedMovies = false;
      this.showFollowing = false ;
    }
    else if(id == 3)
    {
      document.querySelector('.maindiv').scrollIntoView({ 
        behavior: 'smooth' 
      });
      this.router.navigate(['/profile', this.currentUser.UserID.toString(), "3" ]);                  
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = true ; 
    }
    else if(id == 4){
      document.querySelector('.maindiv').scrollIntoView({ 
        behavior: 'smooth' 
      });   
      this.router.navigate(['/profile', this.currentUser.UserID.toString(), "4" ]);                  
      this.showRatedMovies = false;
      this.showFollowers = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = false ;
    }
    else if(id == 5){
      document.querySelector('.maindiv').scrollIntoView({ 
        behavior: 'smooth' 
      });  
      this.router.navigate(['/profile', this.currentUser.UserID.toString(), "5" ]);                  
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = false;
      this.showFollowing = false ;       
      this.showRecommendedMovies = true;
    }
  }

  follow(){
    this.userService.followUser(this.currentUser.UserID)
                    .subscribe(
                      res => {
                        // console.log(res);
                        this.isFollowing = true;
                      },
                      error =>{
                        console.log("error: " + error);
                    });
  }

  unfollow(){
    this.userService.unfollowUser(this.currentUser.UserID)
                    .subscribe(
                      res => {
                        // console.log(res);
                       this.isFollowing = false
                      },
                      error =>{
                        console.log("error: " + error);
                    })
  }

  userChanged(e){
    this.currentUser = e;
    this.route.snapshot.data['user'] = e;
    // console.log(this.route.snapshot.data['user'])
  }

  authUserChanged(e) {
    this.loggedUser = e;
    this.route.snapshot.data['authUser'] = e;
    console.log(this.route.snapshot.data['authUser'])
  }
}
$(document).ready(function() {
  
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      // console.log($(window).scrollTop())
    if ($(window).scrollTop() > 267) {
      $('#profileNav').addClass('fix');
    }
    if ($(window).scrollTop() < 267) {
      $('#profileNav').removeClass('fix');
    }
  });
});
