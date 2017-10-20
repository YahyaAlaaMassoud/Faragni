import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { ToasterService } from 'angular2-toaster';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  model: User;
  loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private toast: ToasterService)
    {
        this.model = new User();
        this.model.UserName = "";
        this.model.Password = "";
        this.model.Email = [];
        this.model.Email[0] = "";
    }

    register() {
        console.log('hamada')
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    //this.toast.pop('success', 'Hello', 'Welcome to Faragni');
                    //this.router.navigate(['/login']);
                },
                error => {
                    //this.toast.pop('error', 'Error', 'Error while login');
                    this.loading = false;
                });
    }

    ngOnInit() {
      this.model = new User();
    }

}
