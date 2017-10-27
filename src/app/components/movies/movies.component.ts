import { Component, OnInit } from '@angular/core';

//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
