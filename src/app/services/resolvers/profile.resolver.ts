import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user/user.service';
import { MovieService } from '../../services/movie/movie.service';
import { User } from '../../models/user.model';
import { Movie } from '../../models/movie.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {

    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getByIdWithAllData(route.params['id']);
    }
}

@Injectable()
export class CurrentAuthenicatedResolver implements Resolve<Observable<User>> {

    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getAuthenticatedUser();
    }
}