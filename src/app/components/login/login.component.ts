import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToasterService } from 'angular2-toaster';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  model: User;
  loading = false;
  returnUrl: string;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toasterService: ToasterService)
  {
      this.model = new User();
      this.model.UserName = "";
      this.model.Password = "";
  }


  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {

      console.log(this.model.UserName + " " + this.model.Password)
      this.authenticationService.login(this.model.UserName, this.model.Password)
          .subscribe(
              data => {
                  console.log('yes')
                  this.loading = true;
                  //this.toasterService.pop('success', 'Hello', 'Welcome to Faragni');
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  console.log('no');
                  //this.toasterService.pop('error', 'Error', 'Error while login');
                  this.loading = false;
              });
  }

}
