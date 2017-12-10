import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'
import { trigger, state, animate, transition, style, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class WelcomeScreenComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  currentScreen: number;

  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toast: ToasterService,
        private authenticationService: AuthenticationService,
        private userService: UserService)
  { 
    this.currentScreen = 1;
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  private loadAllUsers() {
      this.userService.getAll()
                      .subscribe(
                        res => {
                        this.users = res;
                        // console.log(res)
                        },
                        error => {
                          // console.log('Error: ' + error)
                          this.users = []
                        }
                    );
  }

  chooseScreen(e) {
    this.currentScreen = e;
  }
}
