import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import {
  Router,
  ActivatedRoute,  
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

import { LoaderService } from './services/loader/loader.service';

import { Movie } from './models/movie.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  navAppearence: boolean;

  public config1 : ToasterConfig = new ToasterConfig({
            showCloseButton: false,
            tapToDismiss: true,
            timeout: 2500,
            positionClass: 'toast-top-center',
            animation: 'fade',
            newestOnTop: true,
            mouseoverTimerStop: true
        });

  constructor(private route: ActivatedRoute,
              private loaderService: LoaderService,
              private router: Router){
    let path: string = this.route.snapshot.url.join('/');
    if(path.includes('login'))
      this.navAppearence = false;

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit(){
    this.navAppearence = true;
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loaderService.show();
    }
    if (event instanceof NavigationEnd) {
      this.loaderService.hide();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loaderService.hide();
    }
    if (event instanceof NavigationError) {
      this.loaderService.hide();
    }
  }

}
