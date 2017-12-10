// import * as console from 'console';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../services/authentication/authentication.service'
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`.active-purple-2 input[type=text]:focus:not([readonly]) {
                border-bottom: 1px solid #7b4397;
                box-shadow: 0 1px 0 0 #7b4397;
                color: #7b4397;
            }
            .active-purple input[type=text] {
                border-bottom: 1px solid #7b4397;
                box-shadow: 0 1px 0 0 #7b4397;
            }`],
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() hide: boolean;
  @Input() currentUser: User;
  @Output() onModalOpen = new EventEmitter<any>();
  @Output() screenID = new EventEmitter<number>();
  //<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->
  
  @Output() CurrentTab = new EventEmitter<number>();
 // <!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->
  
  currentScreen: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: ToasterService,
              private authService: AuthenticationService,
              private location: Location,
              private userService: UserService)
  {
    this.hide = true;
    this.currentUser = new User();
    this.currentUser = null;
  }
  ngOnInit() {
    console.log(this.currentUser)
    this.getAuthenticatedUser()
    // if(this.route.snapshot.url[0].path === "profile" || this.route.snapshot.url[0].path === "home")
    //   this.currentScreen = 0;
  }

  chooseScreen(id: number){
    this.router.navigate(['/movies', id]);
  }

  toggleModal() {
    this.onModalOpen.emit()
  }

  logout(){
    var toast: any = {
      type: 'info',
      title: 'Good Bye!',
      body: 'See you soon ' + this.currentUser.UserName + '!',
      timeout: 2500
    };
    this.toast.pop(toast)
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  goToProfile(){
    this.currentScreen = 0
    this.CurrentTab.emit(1)
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "1" ]);
    
  }
  goToRecommendation()
  {
    this.CurrentTab.emit(5);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "5" ]);
  }
  goToRatedMovies()
  {
    this.CurrentTab.emit(1);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "1" ]);
  }
  goToMyWatchList()
  {
    this.CurrentTab.emit(2);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "2" ]);
  }
  goToFollowers(){
    this.CurrentTab.emit(4);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "4" ]);
  }
  goToFollowing(){
    this.CurrentTab.emit(6);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "6" ]);
  }

  getAuthenticatedUser() {
    this.userService.getAuthenticatedUser()
              .subscribe( res => {
                this.currentUser = res;
                console.log(res)
              },
              error => {
                console.log("error: " + error)
              }
            )
  }

  openNav() {
      if(document.getElementById("mySidenav").style.width == "250px"){
        this.closeNav();
        return;
      }
      document.getElementById("mySidenav").style.width = "250px";    
  }

  closeNav() {
      document.getElementById("mySidenav").style.width = "0";   
  }
}
