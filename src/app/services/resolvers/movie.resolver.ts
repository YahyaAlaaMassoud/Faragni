import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from '../../models/movie.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Genre } from '../../models/genre.model';
import { GenreService } from '../../services/genre/genre.service';

@Injectable()
export class AllMoviesResolver implements Resolve<Observable<Movie[]>> {

    constructor(private movieService: MovieService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.movieService.getAll();
    }
}

@Injectable()
export class AllGenresResolver implements Resolve<Observable<Genre[]>> {

    constructor(private genreService: GenreService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.genreService.getAll();
    }
}