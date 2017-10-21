import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  navAppearence: boolean;

  constructor(private route: ActivatedRoute,
              public toastr: ToastsManager,
              viewContainerRef: ViewContainerRef){
    this.toastr.setRootViewContainerRef(viewContainerRef);
    let path: string = this.route.snapshot.url.join('/');
    if(!path.includes('login'))
      this.navAppearence = true;
    console.log(this.route.snapshot.url.join('/'))
  }

  ngOnInit(){
    this.navAppearence = false;
  }

}
