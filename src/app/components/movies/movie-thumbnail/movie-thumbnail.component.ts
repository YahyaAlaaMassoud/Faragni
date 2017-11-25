import { Component, OnInit, Input } from '@angular/core';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { Movie } from '../../../models/movie.model'

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {

    @Input() currentMovie: Movie;
    flip: boolean;
    photo: string;
    //list: Movie[] = [];

    constructor(private omdb: OmdbMoviesService) {
      this.flip = false;
      /*this.omdb.getMovieByImdbID("tt0137523")
      .subscribe(
        res => {
          this.cur = <Movie>res;
        },
        error => {
          console.log("Error: ", error);
        }
      );*/
    }

    ngOnInit() {
      console.log(this.currentMovie.Poster)
      this.photo = `url(${this.currentMovie.Poster})`
    }

}
