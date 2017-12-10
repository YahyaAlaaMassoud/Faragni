import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

//animations
import { fadeInAnimation } from '../../animations/fade-in.animation'
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ActivityComponent implements OnInit {


  users: User[];
  constructor(private location: Location, private userService: UserService) { }

  ngOnInit() {
    // this.location.replaceState('/activity')
    this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getAll()
                    .subscribe(
                      res => {
                        this.users = res;
                        console.log('henaaaaa')
                        console.log(res)
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

}
