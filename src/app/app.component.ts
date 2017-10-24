import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  navAppearence: boolean;

  constructor(private route: ActivatedRoute){
    let path: string = this.route.snapshot.url.join('/');
    if(!path.includes('login'))
      this.navAppearence = true;
    console.log(this.route.snapshot.url.join('/'))
  }

  ngOnInit(){
    this.navAppearence = false;
  }

}
