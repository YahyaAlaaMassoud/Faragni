import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

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


  constructor(private location: Location) { }

  ngOnInit() {
    this.location.replaceState('/activity')
  }

}
