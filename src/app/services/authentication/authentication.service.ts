import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from '../../models/user.model'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log(username + ' ' + password)
                let user = response.json();
                console.log(response.json());
                let curr = new User();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    curr.UserID = user.id;
                    curr.UserName = user.username;
                    curr.FirstName = user.firstName;
                    curr.LastName = user.lastName;
                    curr.Email = user.email;
                    curr.profilePic = user.profilepic;
                    console.log(curr.profilePic);
                    curr.token = user.token;
                    curr.WatchList = user.watchlist;
                    curr.MovieRatings = user.ratings;
                    console.log("email = " + user.email);
                    localStorage.setItem('currentUser', JSON.stringify(curr));
                }

                return curr;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
