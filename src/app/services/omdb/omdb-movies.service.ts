import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpService } from '../custom-http-service/custom-http-service.service';
import { Movie } from '../../models/movie.model'

@Injectable()
export class OmdbMoviesService {

    constructor(private http: Http, private customHttp: HttpService) { }

    getMovieByImdbID(id: string){
        const url: string = 'https://www.omdbapi.com/?i=' + id + '&apikey=ddd4a842';
        return this.customHttp.get(url)
          .map(res => <Movie>res.json())
    }
}
