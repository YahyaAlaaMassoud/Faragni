import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../models/user.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  @Input() hide: boolean;
  @Input() currentUser: User;
  @Output() onModalOpen = new EventEmitter<any>();

  constructor() {
    this.hide = true;
    this.currentUser = null;
  }

  ngOnInit() {
  }

  toggleModal() {
    this.onModalOpen.emit()
  }

}
