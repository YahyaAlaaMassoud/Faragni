import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
//models
import { User } from '../../models/user.model';

//wrappers
import 'jquery';
import 'bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

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
  }

  login() {
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
      this.loading = true;
      this.model.Email = [];
      this.model.Email.push(this.email)
      this.userService.create(this.model)
          .subscribe(
              data => {
                  // set success message and pass true paramater to persist the message after redirecting to the login page
                  //this.toast.pop('success', 'Hello', 'Welcome to Faragni');
                  this.loginOrRegiser = !this.loginOrRegiser
                  this.loading = false;
                  console.log('leh')
              },
              error => {
                  //this.toast.pop('error', 'Error', 'Error while login');
                  this.loading = false;
                  console.log('ahhhh')
              });
  }

  toggleModal(){
    this.loginOrRegiser = false;
    $('#loginModal').modal('toggle');
  }
}
