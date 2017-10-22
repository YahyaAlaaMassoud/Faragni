import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor() {
    this.hide = true ;
  }

  @Input() hide:boolean ;
  ngOnInit() {
  }

}
