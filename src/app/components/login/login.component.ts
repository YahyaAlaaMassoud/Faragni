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
      this.model.Email = [];
      this.email = "";
      this.model.Password = "";
      this.loginOrRegiser = false;
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
      this.authenticationService.login(this.model.UserName, this.model.Password)
          .subscribe(
              data => {
                  this.loading = true;
                  var toast: any = {
                    type: 'success',
                    title: 'Hello!',
                    body: 'Nice to see you ' + data.UserName + '!',
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
      this.model.Email = [];
      this.model.Email.push(this.email)
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
  
   checkInput(ev)
  {
    var myInput =ev;
    var rg ;
    console.log(myInput.name);
    if(myInput.name=="email"){
      rg = new RegExp("([a-zA-Z][\w]*[@][a-zA-Z0-9]+[.][a-z]{2,3})");
      if(!rg.test(myInput.value))
      {
        alert("Please enter valid email address : example@example.abc");
        return false;
      }
    }
    else if(myInput.name =="fn" || myInput.name=="ln")
    {
      rg = new RegExp("([a-zA-Z]+)");
      if(!rg.test(myInput.value))
      {
        alert("Please enter valid Name : example");
        return false;
      }
    }
    else if(myInput.name=="pw")
    {
      rg = new RegExp("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,})");
      if(!rg.test(myInput.value))
      {
        alert("Password must have atleast one small character"+
                                        ",one capital character"+
                                        ",one special character"+
                                        "and one digit");
        return false;
      }
    }
    else if(myInput.name=="un")
    {
      rg = new RegExp("([a-zA-z_][\w]{5,12})");      
      if(!rg.test(myInput.value))
      {
        alert("please enter valid username"+
              "username must be at least 6 characters and at most 13 characters");
        return false;
      }
    }
}
//        <!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->


}
