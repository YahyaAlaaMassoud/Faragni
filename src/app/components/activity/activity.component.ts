import { Component, OnInit } from '@angular/core';
//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'
import { User } from '../../models/user.model';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ActivityComponent implements OnInit {

  currentUser:User;
  currentScreen:number;
  constructor() { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      this.currentScreen = 0;
  }

  ngOnInit() {
  }
  chooseScreen(temp)
  {
    this.currentScreen=temp;
  }

}
