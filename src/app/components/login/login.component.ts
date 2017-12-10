import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';

import { User } from '../../models/user.model';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {

  model: User;
  loading = false;
  returnUrl: string;
  loginOrRegiser: boolean;
  email: string;
  emValid:boolean;
  unValid:boolean;
  fnValid:boolean;
  lnValid:boolean;
  passValid:boolean;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toast: ToasterService,
        private authenticationService: AuthenticationService,
        private userService: UserService)
  {
      this.model = new User();
      this.model.UserName = "";
      this.model.FirstName = "";
      this.model.LastName = "";
      // this.model.Email = [];
      this.email = "";
      this.model.Password = "";
      this.loginOrRegiser = false;
      this.unValid = false;
      this.emValid = false;
      this.passValid = false;
      this.fnValid = false;
      this.lnValid = false;
  }


  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //   console.log(localStorage.getItem('currentUser'))
  }

  login() {
    //   console.log('logged in')
      this.authenticationService.login(this.model.Email, this.model.Password)
          .subscribe(
              data => {
                console.log(data)
                  this.loading = true;
                  var toast: any = {
                    type: 'success',
                    title: 'Hello!',
                    // body: 'Nice to see you ' + data.UserName + '!',
                    timeout: 2500
                  };
                //   console.log(this.model.UserName);
                //   console.log(this.model.Password)
                  this.toast.pop(toast)
                  //this.toasterService.pop('success', 'Hello', 'Welcome to Faragni');
                  this.router.navigate(['/welcome']);
              },
              error => {
                  //this.toasterService.pop('error', 'Error', 'Error while login');
                //   console.log('error')
                  this.loading = false;
              });
  }

  register() {
      this.loading = true;
      // this.model.Email = [];
      // this.model.Email.push(this.email)
    //   console.log(this.model)
      this.userService.create(this.model)
          .subscribe(
              data => {
                  // set success message and pass true paramater to persist the message after redirecting to the login page
                  this.loginOrRegiser = !this.loginOrRegiser
                  this.loading = false;
              },
              error => {
                  //this.toast.pop('error', 'Error', 'Error while login');
                  this.loading = false;
              });
  }
  //<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->
  
  checkInput(myInput)
  {
    var rg ;
    if(myInput=="em"){
      rg = new RegExp("([a-zA-Z][\w]*[@][a-zA-Z0-9]+[.][a-z]{2,3})");
      if(!rg.test(this.model.Email))
      {
        this.emValid = false;
        alert("Please enter valid email address : example@example.abc");
        myInput.style.backgroundColor="red";
        return false;
      }
      else
      this.emValid = true ;
    }
    else if(myInput =="fn")
    {
      rg = new RegExp("^([a-zA-Z]+)$");
      if(!rg.test(this.model.FirstName)) 
      {
        this.fnValid = false;
        alert("Please enter valid Name : example");
        return false;
      }
      else 
        this.fnValid = true;
    }
    else if(myInput =="ln")
    {
      rg = new RegExp("^([a-zA-Z]+)$");
      if(!rg.test(this.model.LastName)) 
      {
        this.lnValid = false;
        alert("Please enter valid Name : example");
        return false;
      }
      else
        this.lnValid = true;
    }
    else if(myInput=="pw")
    {
      rg = new RegExp("^([a-zA-Z0-9@*#]{8,15})$");
      console.log(this.model.Password)
      if(!rg.test(this.model.Password))
      {
        this.passValid = false;
        alert("Please enter valid password");
        return false;
      }
      else
        this.passValid = true;
    }
    else if(myInput=="un")
    {
       rg = new RegExp("^([a-zA-z_][a-zA-Z0-9]{5,12})$");
       console.log(this.model.UserName)
      if(!rg.test(this.model.UserName))
      {
        this.unValid = false;
        alert("please enter valid username"+
              " username must be at least 6 characters and at most 13 characters");
        return false;
      }
      else
        this.unValid = true ; 
    }
}
//        <!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->


}
