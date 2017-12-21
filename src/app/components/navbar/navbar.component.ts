import { el } from '@angular/platform-browser/testing/src/browser_util';
import { OnChange } from 'ngx-bootstrap/ng2-bootstrap';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../services/authentication/authentication.service'
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

import { User } from '../../models/user.model';
import { document } from 'angular-bootstrap-md/utils/facade/browser';

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
export class NavbarComponent implements OnInit, OnChanges {

  @Input() hide: boolean;
  @Input() currentUser: User;
  @Output() onModalOpen = new EventEmitter<any>();
  @Output() screenID = new EventEmitter<number>();
  @Input() home: boolean;
  @Output() CurrentTab = new EventEmitter<number>();

  showAvatar: boolean;
  
  currentScreen: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: ToasterService,
              private authService: AuthenticationService,
              private location: Location,
              private userService: UserService)
  {
    this.home = false;
    this.currentUser = new User();
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if(changes['currentUser'] !== undefined)
      this.currentUser = changes['currentUser'].currentValue
    if(changes['currentScreen'] !== undefined)
      this.currentScreen = changes['currentScreen'].currentValue
  }

  ngOnInit() {
    this.getAuthenticatedUser()
  }

  chooseScreen(id: number){
    this.currentScreen = id;
    this.router.navigate(['/movies', id]);
  }

  toggleModal() {
    this.onModalOpen.emit()
  }

  logout(){
    var toast: any = {
      type: 'info',
      title: 'Good Bye!',
      body: 'See you soon ' + this.currentUser.FirstName + '!',
      timeout: 2500
    };
    this.toast.pop(toast)
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  
  goToProfile(){
    this.currentScreen = 0
    this.CurrentTab.emit(1)
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "1" ]);
    this.closeNav();
  }
  goToRecommendation()
  {
    this.CurrentTab.emit(5);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "5" ]);
    this.closeNav();
  }
  goToRatedMovies()
  {
    this.CurrentTab.emit(1);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "1" ]);
    this.closeNav();
  }
  goToMyWatchList()
  {
    this.CurrentTab.emit(2);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "2" ]);
    this.closeNav();
  }
  goToFollowers(){
    this.CurrentTab.emit(4);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "4" ]);
    this.closeNav();
  }
  goToFollowing(){
    this.CurrentTab.emit(6);
    this.router.navigate(['/profile', this.currentUser.UserID.toString(), "3" ]);
    this.closeNav();
  }

  getAuthenticatedUser() {
    this.currentUser = this.route.snapshot.data['authUser'];
  }

  openNav() {
      if($('#mySidenav').hasClass('openSide')){
        this.closeNav();
        return;
      }
      // console.log('open')
      
      if(document.getElementById("mainDiv") != null){
        document.getElementById("mainDiv").style.opacity = "0.3"
      }
      else if(document.getElementById("moviesDiv") != null){
        document.getElementById("moviesDiv").style.opacity = "0.3"; 
      }

      document.getElementById("sideBarImg").style.marginTop = "58px";    
      document.getElementById("sideBarImg").style.border = "5px solid #7b4397";    
      document.getElementById("sideBarImg").style.width = "115px";
      document.getElementById("sideBarImg").style.height = "115px";  
    
      $('#mySidenav').addClass('openSide');
    }

  closeNav() {
    // console.log('close')
    if(document.getElementById("mainDiv") != null)
      document.getElementById("mainDiv").style.opacity = "1"    
    else if(document.getElementById("moviesDiv") != null)
      document.getElementById("moviesDiv").style.opacity = "1"
    document.getElementById("sideBarImg").style.border = "none";          
    document.getElementById("sideBarImg").style.marginTop = "8px";              
    document.getElementById("sideBarImg").style.width = "40px";
    document.getElementById("sideBarImg").style.height = "40px"; 
    $('#mySidenav').removeClass('openSide');
  }
}

$(document).ready(function() {
  
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      // console.log($(window).scrollTop())
    if ($(window).scrollTop() > 267) {
      $('#faragniNav').addClass('fix');
    }
    if ($(window).scrollTop() < 267) {
      $('#faragniNav').removeClass('fix');
    }
  });
});

$(document).ready(function() {
  $(document).click(function (e) {
    var menu = $('#mySidenav'); 
    var ok1 = $(e.target).is('#sideBarImg')
    var ok2 = $(e.target).is('#mySidenav')
    // console.log(ok1 + ' ' + ok2)
    if(!ok1 && !ok2){
      if(document.getElementById("mainDiv") != null){
        document.getElementById("mainDiv").style.opacity = "1"  
        document.getElementById("sideBarImg").style.border = "none";          
        document.getElementById("sideBarImg").style.marginTop = "8px";   
        document.getElementById("sideBarImg").style.width = "40px";
        document.getElementById("sideBarImg").style.height = "40px"; 
      }
      else if(document.getElementById("moviesDiv") != null){
        document.getElementById("moviesDiv").style.opacity = "1"   
        document.getElementById("sideBarImg").style.border = "none";          
        document.getElementById("sideBarImg").style.marginTop = "8px";   
        document.getElementById("sideBarImg").style.width = "40px";
        document.getElementById("sideBarImg").style.height = "40px"; 
      }
      $('#mySidenav').removeClass('openSide');
    }
    // if (ok) {
    //   console.log('hide')
    //   if(menu.hasClass('openSide') && !ok){
    //     menu.removeClass('openSide');
    //     document.getElementById("sideBarImg").style.width = "40px";
    //     document.getElementById("sideBarImg").style.height = "40px"; 
    //   }
    //   else{
    //     $('#mySidenav').addClass('openSide');
    //     document.getElementById("sideBarImg").style.width = "100px";
    //     document.getElementById("sideBarImg").style.height = "100px";   
    //   }
    // }
  });
});