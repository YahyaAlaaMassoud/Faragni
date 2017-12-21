import { Component, OnInit, ViewEncapsulation, Input , EventEmitter, Output, OnChanges, SimpleChange} from '@angular/core';
import { User } from '../../../../models/user.model';
//<!-- LOUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAA START -->

import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../services/user/user.service';
// /users/:id/follows_me
// /users/:id/follows_him
@Component({
  selector: 'app-followers-thumbnail',
  templateUrl: './followers-thumbnail.component.html',
  styleUrls: ['./followers-thumbnail.component.css']
})
export class FollowersThumbnailComponent implements OnInit {
  
  @Input() currentFollower: User;
  @Output() currentUserModel = new EventEmitter<User>();
  authenticatedUser: User;
  currentUser: User;
  isFollowing:boolean;
  realFollower: User;

  constructor(private router: Router, 
              private userService: UserService,
              private route: ActivatedRoute) { 
    this.authenticatedUser = new User();
    this.currentUser = new User();    
    this.realFollower = new User();
    this.realFollower.Followers = [];
    this.realFollower.Following = [];
  }

  ngOnInit() {
    this.getUserData()
    this.currentUser = this.route.snapshot.data['user'];
    console.log(this.currentUser)
    this.authenticatedUser = this.route.snapshot.data['authUser'];
    this.isFollowing = false;
    // console.log(this.authenticatedUser.Following)
    const index: number = this.authenticatedUser.Following
          .findIndex(u => u.UserID === this.currentFollower.UserID);
    if(index != -1)
      this.isFollowing = true;
  }

  getUserData(){
    this.userService.getByIdWithAllData(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        this.realFollower = res;
                      },
                      error => {
                        console.log(error)
                      }
                    )
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    // if(changes['currentFollowings'] !== undefined){
    //   this.currentFollowings = changes['currentFollowings'].currentValue || []
    //   this.isFollowing = false;
    //   for(let i: number = 0; i < this.currentFollowings.length; i++){
    //     if(this.currentFollowings[i].UserID == this.currentFollower.UserID){
    //       this.isFollowing = true;
    //       break;
    //     }
    //   }
    // }
  }

  goToProfile(){
    this.router.navigate(['/profile', this.currentFollower.UserID.toString(), "1"]);
  }

  unfollowUser(){
      this.userService.unfollowUser(this.currentFollower.UserID)
                      .subscribe(
                        res => {
                          this.isFollowing = false;
                          const index: number = this.authenticatedUser.Following
                                .findIndex(u => u.UserID == this.currentFollower.UserID)
                          this.authenticatedUser.Following.splice(index, 1);
                          this.currentUserModel.emit(this.authenticatedUser)
                        },
                        error => {
                          console.log('Error: ' + error)
                        }
                      )
  }

  followUser(){
    this.userService.followUser(this.currentFollower.UserID)
                    .subscribe(
                      res => {
                        this.isFollowing = true;
                        this.authenticatedUser.Following.push(this.currentFollower);
                        this.currentUserModel.emit(this.authenticatedUser)
                      },
                      error => {
                        console.log('Error: ' + error)
                      }
                    )
  }

  rotateCard(btn){
    var card = $("#rotateBtn").closest('.card-container-ff');
    // console.log(card);
    if(card.hasClass('hover-ff')){
        card.removeClass('hover-ff');
    } else {
        card.addClass('hover-ff');
    }
  }
}