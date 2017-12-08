import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from '../../services/custom-http-service/custom-http-service.service';

import { User } from '../../models/user.model';

@Injectable()
export class UserService {

    constructor(private httpService: HttpService, private http: Http) { }

    getAll() {
        return this.http.get('users')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    getById(id: number) {
        return this.http.get('users/' + id)
                        .map(res => <User>res.json())
                        .catch(this.handleError)
    }

    create(user: User) {
        return this.http.post('users', JSON.stringify(user))
                        .map(res => <User>res.json())
                        .catch(this.handleError)
    }

    update(user: User) {
        return this.http.put('users/' + user.UserID, JSON.stringify(user))
                        .map(res => <User>res.json())
                        .catch(this.handleError)
    }

    delete(id: number) {
        return this.http.delete('users/' + id)
                        .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
