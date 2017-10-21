import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html'
})
export class WelcomeScreenComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  deleteUser(id: number) {
    console.log(id)
      this.userService.delete(id)
        .subscribe(() => {
          console.log('deleted')
          this.loadAllUsers()
        });
  }

  private loadAllUsers() {
      this.userService.getAll()
        .subscribe(users => {
          this.users = users;
          console.log(users)
        });
  }
}
