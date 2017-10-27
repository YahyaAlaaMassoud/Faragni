import { Component, OnInit } from '@angular/core';
//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ActivityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
