import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class ProfileResolver implements Resolve<Observable<User>> {

    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getById(route.params['id']);
    }
}