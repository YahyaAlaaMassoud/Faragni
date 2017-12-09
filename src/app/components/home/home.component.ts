import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

//models
import { User } from '../../models/user.model';

//wrappers
import 'jquery';
import 'bootstrap';

//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
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
        private toast: ToasterService,
        private authenticationService: AuthenticationService,
        private userService: UserService)
  {
    this.model = new User();
    this.model.UserName = "";
    this.model.FirstName = "";
    this.model.LastName = "";
    this.model.Email = "";
    this.email = "";
    this.model.Password = "";
    this.loginOrRegiser = false;
  }

  ngOnInit() {
  }

  login() {
      console.log(this.model.Email)
      this.authenticationService.login(this.model.Email, this.model.Password)
          .subscribe(
              data => {
                  this.loading = true;
                  var toast: any = {
                    type: 'success',
                    title: 'Hello!',
                    // body: 'Nice to see you ' + data.UserName + '!',
                    timeout: 2500
                  };
                  
                  this.toast.pop(toast)
                  //this.toasterService.pop('success', 'Hello', 'Welcome to Faragni');

                  this.router.navigate(['/welcome']);
              },
              error => {
                  //this.toasterService.pop('error', 'Error', 'Error while login');
                  this.loading = false;
              });
  }

  register() {
      this.loading = true;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  console.log(data)
                  // set success message and pass true paramater to persist the message after redirecting to the login page
                  //this.toast.pop('success', 'Hello', 'Welcome to Faragni');
                  this.loginOrRegiser = !this.loginOrRegiser
                  this.loading = false;
              },
              error => {
                  //this.toast.pop('error', 'Error', 'Error while login');
                  this.loading = false;
              });
  }

  toggleModal(){
    this.loginOrRegiser = false;
    $('#loginModal').modal('toggle');
  }
}
