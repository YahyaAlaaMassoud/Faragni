import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
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
        private authenticationService: AuthenticationService,
        public toastr: ToastsManager,
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
      console.log(localStorage.getItem('currentUser'))
  }

  login() {
      this.toastr.info('You are awesome!');
      console.log('logged in')
      this.authenticationService.login(this.model.UserName, this.model.Password)
          .subscribe(
              data => {
                  console.log('yes')
                  this.loading = true;
                  //this.toasterService.pop('success', 'Hello', 'Welcome to Faragni');
                  this.router.navigate(['/welcome']);
              },
              error => {
                  console.log('no');
                  //this.toasterService.pop('error', 'Error', 'Error while login');
                  this.loading = false;
              });
  }

  register() {
      console.log('registered')
      this.toastr.success('You are awesome!', 'registering');
      this.loading = true;
      this.model.Email = [];
      this.model.Email.push(this.email)
      console.log(this.model)
      this.userService.create(this.model)
          .subscribe(
              data => {
                  // set success message and pass true paramater to persist the message after redirecting to the login page
                  //this.toast.pop('success', 'Hello', 'Welcome to Faragni');
                  this.loginOrRegiser = !this.loginOrRegiser
              },
              error => {
                  //this.toast.pop('error', 'Error', 'Error while login');
                  this.loading = false;
              });
  }

}
