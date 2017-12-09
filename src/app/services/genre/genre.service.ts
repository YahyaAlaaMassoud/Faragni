import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from '../../services/custom-http-service/custom-http-service.service';

import { Genre } from '../../models/genre.model';

@Injectable()
export class GenreService {

    constructor(private http: HttpService) { }

    getAll() {
        return this.http.get('genres')
                        .map(res => <Genre[]>res.json())
                        .catch(this.handleError)
    }

    getById(id: number) {
        return this.http.get('genres/' + id)
                        .map(res => <Genre>res.json())
                        .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
