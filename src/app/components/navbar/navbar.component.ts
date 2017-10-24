import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  @Input() hide: boolean;
  @Output() onModalOpen = new EventEmitter<any>();

  constructor() {
    this.hide = true;
  }

  ngOnInit() {
  }

  toggleModal() {
    this.onModalOpen.emit()
  }

}
