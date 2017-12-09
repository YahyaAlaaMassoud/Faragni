import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from '../../services/custom-http-service/custom-http-service.service';

import { Movie } from '../../models/movie.model';

@Injectable()
export class MovieService {

    constructor(private http: HttpService) { }

    getAll() {
        return this.http.get('movies')
                        .map(res => <Movie[]>res.json())
                        .catch(this.handleError)
    }

    getAllSortedBy(criteria: string) {
        return this.http.get('movies/sort_by/' + criteria)
                        .map(res => <Movie[]>res.json())
                        .catch(this.handleError)
    }

    getById(id: number) {
        return this.http.get('movies/' + id)
                        .map(res => <Movie>res.json())
                        .catch(this.handleError)
    }

    addToWatchlist(id: number) {
      return this.http.get('movies/' + id + '/add_to_watchlist')
                      .map(res => <Movie[]>res.json())
                      .catch(this.handleError)
    }

    removeFromWatchlist(id: number) {
      return this.http.get('movies/' + id + '/remove_from_watchlist')
                      .map(res => <Movie[]>res.json())
                      .catch(this.handleError)
    }

    create(movie: Movie) {
        return this.http.post('movies', JSON.stringify(movie))
                        .map(res => <Movie>res.json())
                        .catch(this.handleError)
    }

    update(movie: Movie) {
        return this.http.put('movies/' + movie.MovieID, JSON.stringify(movie))
                        .map(res => <Movie>res.json())
                        .catch(this.handleError)
    }

    delete(id: number) {
        return this.http.delete('movies/' + id)
                        .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
