import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpService } from '../../services/custom-http-service/custom-http-service.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from '../../models/user.model'

@Injectable()
export class AuthenticationService {
    
    constructor(private http: HttpService) { }

    login(username: string, password: string) {
        return this.http.post('authenticate', JSON.stringify({auth: { Email: username, password: password }}))
            .map(res => {
                // debugger;
                console.log(res.jwt)

                localStorage.setItem('jwt', res.json().jwt);
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('jwt');
    }
}
