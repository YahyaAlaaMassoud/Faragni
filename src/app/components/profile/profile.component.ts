import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Event } from 'angular-bootstrap-md/utils/facade/browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  isEdit: boolean;
  myBio: String;
  showFollowers: boolean;
  constructor(private router:Router) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));     
      this.currentUser.Email=["khaledawaled@live.com"];
      this.currentUser.JoiningDate = new Date("May");
      this.currentUser.Age = 21;
      this.isEdit = false;
      this.myBio = "";
      this.showFollowers=false;
  }

  ngOnInit() {

  }
  takeAction(element){
    this.isEdit = !this.isEdit;
    if(this.isEdit)
       element.textContent = "SAVE";
    else
      element.textContent = "EDIT PROFILE";


  }
  goToFollowers()
  {
    this.router.navigate(['followers']);
  }

}
