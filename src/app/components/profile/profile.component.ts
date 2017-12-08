import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { Event, document } from 'angular-bootstrap-md/utils/facade/browser';
import { Router, ActivatedRoute } from '@angular/router';

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
  currentScreen:number;
  louda:User;
  user1:User;
  constructor(private router:Router) {
      this.louda = new User();
      this.user1 = new User();
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));    
      this.currentUser.Email=["khaledawaled@live.com"];
      this.currentUser.Age = 21;
      this.currentScreen = 0;
      this.isEdit = false;
      this.showFollowers = false;
      this.showRatedMovies = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false; 
      this.louda.bio="hamada ra7 wa magash";
      this.louda.FirstName = "louda";
      this.louda.LastName = "hamada";
      this.louda.profilePic = this.currentUser.profilePic;
      this.user1.FirstName = "tftf";
      this.user1.LastName = "2f2f";
      this.user1.bio = "hanafy comes first";
      this.user1.profilePic = this.currentUser.profilePic;
      this.currentUser.Followers=[];
      this.currentUser.Followers.push(this.louda);
      this.currentUser.Followers.push(this.user1);
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
      console.log(this.currentUser.Followers);
      }
  ngOnInit() {

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
    }
    else if(id == 2){
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = true;
      this.showRecommendedMovies = false;
    }
    else if(id == 4){
      this.showRatedMovies = false;
      this.showFollowers = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
    }
    else if(id == 5){
      this.showRatedMovies = false;
      this.showFollowers = false;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = true;
      console.log(id)
    }
  }
}
