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
  louda:User;
  user1:User;
  loggedUser: User;
  user2: User;

  constructor(private router:Router, 
              private route: ActivatedRoute, 
              private userService: UserService,
              private cdRef: ChangeDetectorRef) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 

      this.louda = new User();
      this.user1 = new User();
      this.user2 = new User();
      this.currentUser.Email=["khaledawaled@live.com"];
      this.currentUser.Age = 21;
      this.currentScreen = 0;
      this.isEdit = false;
      this.showFollowers = false;
      this.showRatedMovies = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.showFollowing = false;
      this.currentUser.Friends=[]
     // this.currentUser.Friends.push(this.currentUser);
       localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
      // console.log(this.currentUser.Friends);
      this.user2.FirstName = "waleed";
      this.user2.LastName = "elnaser";
      this.user2.bio = "ana raye7 fen ";
      this.user2.profilePic = this.currentUser.profilePic;
      this.louda.bio="hamada ra7 wa magash";
      this.louda.FirstName = "louda";
      this.louda.LastName = "hamada";
      this.louda.profilePic = this.currentUser.profilePic;
      this.louda.UserID = 2 ; 
      this.user1.UserID = 3 ; 
      this.user2.UserID = 4 ;
      this.user1.FirstName = "tftf";
      this.user1.LastName = "2f2f";
      this.user1.bio = "hanafy comes first";
      this.user1.profilePic = this.currentUser.profilePic;
      this.currentUser.Followers=[];
      this.currentUser.Followers.push(this.louda);
      this.currentUser.Followers.push(this.user1);
      this.currentUser.Following=[];
      this.currentUser.Following.push(this.user2);
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
      console.log(this.currentUser.Followers);
  }

  ngOnInit() {
    this.changeMeOnUpdate()
    
    // console.log(this.cdRef.detectChanges())
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    console.log(this.route.snapshot.data)
    if(this.route.snapshot.data['user'] === null){
      this.router.navigate(['/404']);
    }
    else{
      this.isLoggedInUser = (this.currentUser.UserID === this.route.snapshot.data['user'].UserID) ? true : false;
      if(!this.isLoggedInUser){
        let ok: boolean = false;
        this.currentUser.Following = this.currentUser.Following || [];
        this.currentUser.Following.forEach(usr =>{
          if(usr.UserID === id){
            ok = true;
          }
        })
        this.isFollowed = ok;
      }
      // // console.log(this.isLoggedInUser)
      this.currentUser = this.route.snapshot.data['user'];

      this.fullName = this.currentUser.FirstName + ' ' + this.currentUser.LastName;
      this.currentUser.bio = "ana esmy hamada"

      this.loggedUser = JSON.parse(localStorage.getItem('currentUser'))
    }
    // console.log(this.currentUser)
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
              console.log(res)
              this.currentUser = res;
              console.log(this.currentUser);
              this.isLoggedInUser = (this.currentUser.UserID === this.route.snapshot.data['user'].UserID) ? true : false;            
              this.chooseTab(1)
              window.scrollTo(0,0);
            }
          })
        })
    }

  takeAction(element){
    this.isEdit = !this.isEdit;
    if(this.isEdit){
       element.textContent = "SAVE";
    }
    else{
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser)); 
      this.updateUsersList(this.currentUser);      
      element.textContent = "EDIT PROFILE";
    }
  }
  chooseScreen(e)
  {
    this.currentScreen = e ; 
  }
  onFileChange(fileInput: any){
    this.currentUser.profilePic = fileInput.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.currentUser.profilePic = e.target.result;
        localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
        this.updateUsersList(this.currentUser);           
    }
    reader.readAsDataURL(fileInput.target.files[0]);
  } 
  updateUsersList(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const index: number = users
      .findIndex(item => item.UserID === user.UserID);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  chooseTab(id: number){
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
      console.log(id)
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

  hh(){
    console.log('hamada')
  }

  follow(){
    let usr: User = JSON.parse(localStorage.getItem('currentUser'));  
    usr.Following = usr.Following || [] 
    usr.Following.push(this.currentUser);
    localStorage.setItem('currentUser', JSON.stringify(usr));
    this.updateUsersList(usr);
    this.isFollowed = !this.isFollowed;
    console.log(this.isFollowed)
  }

  unfollow(){
    let usr: User = JSON.parse(localStorage.getItem('currentUser')); 
    usr.Following = usr.Following || []     
    const index: number = usr.Following.findIndex(item => item.UserID === this.currentUser.UserID);
    usr.Following.splice(index, 1);
    localStorage.setItem('currentUser', JSON.stringify(usr));
    this.updateUsersList(usr);
    this.isFollowed = !this.isFollowed;    
  }
}
