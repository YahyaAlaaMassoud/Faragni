import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'

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
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.currentScreen = 0;
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  deleteUser(id: number) {
    console.log(id)
      this.userService.delete(id)
        .subscribe(() => {
          console.log('deleted')
          this.loadAllUsers()
        });
  }

  private loadAllUsers() {
      this.userService.getAll()
        .subscribe(users => {
          this.users = users;
          console.log(users)
        });
  }

  logout(){
    var toast: any = {
      type: 'info',
      title: 'Good Bye!',
      body: 'See you soon ' + this.currentUser.UserName + '!',
      timeout: 2500
    };
    this.toast.pop(toast)
    console.log('goodbye')
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  chooseScreen(e){
    console.log(e)
    this.currentScreen = e;
  }
}
