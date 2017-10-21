import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  openModal: boolean;
  constructor() {
    this.openModal = false;
  }

  ngOnInit() {
  }
}
