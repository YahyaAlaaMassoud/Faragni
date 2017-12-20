import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../models/user.model';
//<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->
import { UserService } from '../../../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-following-thumbnail',
  templateUrl: './following-thumbnail.component.html',
  styleUrls: ['./following-thumbnail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FollowingThumbnailComponent implements OnInit {

  @Input() currentFollowing:User;
  currentUser:User;

  @Output() followingDataSource = new EventEmitter<User[]>(); 

  constructor(private router: Router,private userService: UserService) { 
  }

  ngOnInit() {
}
  goToProfile(){
    this.router.navigate(['/profile', this.currentFollowing.UserID.toString(), "1"]);
  }

  unfollowUser(){
    this.userService.unfollowUser(this.currentFollowing.UserID)
                    .subscribe(
                      res => {
                        this.followingDataSource.emit(res);
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }
}
