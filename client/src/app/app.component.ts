import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

import { Movie } from './models/movie.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  navAppearence: boolean;
  movies: Movie[];

  public config1 : ToasterConfig = new ToasterConfig({
            showCloseButton: false,
            tapToDismiss: true,
            timeout: 0,
            positionClass: 'toast-bottom-center',
            animation: 'slideUp'
        });

  constructor(private route: ActivatedRoute){
    let path: string = this.route.snapshot.url.join('/');
    if(path.includes('login'))
      this.navAppearence = false;
    console.log(this.route.snapshot.url.join('/'))
    this.movies = [];
  }

  ngOnInit(){
    this.navAppearence = true;
  }

}
