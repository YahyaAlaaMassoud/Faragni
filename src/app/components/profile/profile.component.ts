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
  currentScreen:number;
  constructor(private router:Router) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));     
     // this.currentUser.Email=["khaledawaled@live.com"];
      this.currentUser.JoiningDate = new Date("May");
      this.currentUser.Age = 21;
      this.currentUser.bio = "";
      //localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
      this.currentScreen = 0;
      this.isEdit = false;
      this.showFollowers=false;
      this.showRatedMovies=true;
  }

  ngOnInit() {

  }
  takeAction(element){
    this.isEdit = !this.isEdit;
    var myimg = document.getElementById("pfimg");
    if(this.isEdit){
       element.textContent = "SAVE";
        myimg.className=myimg.className.concat(" avatarEdit");
    }
    else{
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser)); 
      this.updateUsersList(this.currentUser);      
      element.textContent = "EDIT PROFILE";

      myimg.className="useravatar";
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
}
