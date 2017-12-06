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
  constructor(private router:Router) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));    
      console.log(this.currentUser); 
      this.currentUser.Email=["khaledawaled@live.com"];
      this.currentUser.Age = 21;
      this.currentUser.bio = "";
      //localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
      this.currentScreen = 0;
      this.isEdit = false;
      this.showFollowers = false;
      this.showRatedMovies = true;
      this.showWatchlistMovies = false;
      this.showRecommendedMovies = false;
      this.currentUser.Friends=[]
     // this.currentUser.Friends.push(this.currentUser);
       localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
      console.log(this.currentUser.Friends);
  }

  ngOnInit() {
    console.log('fi eh')
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
    console.log(e)
  }
  onFileChange(fileInput: any){
    this.currentUser.profilePic = fileInput.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.currentUser.profilePic = e.target.result;
        localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
        console.log('tamam?')
        this.updateUsersList(this.currentUser);           
    }
    reader.readAsDataURL(fileInput.target.files[0]);
  } 
  updateUsersList(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    const index: number = users
      .findIndex(item => item.UserID === user.UserID);
    users[index] = user;
    console.log('tamam')
    localStorage.setItem('users', JSON.stringify(users));
  }

  chooseTab(id: number){
    console.log(id)
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
