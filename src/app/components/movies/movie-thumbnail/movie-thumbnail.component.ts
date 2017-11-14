import { Component, OnInit, Input } from '@angular/core';
import { OmdbMoviesService } from '../../../services/omdb/omdb-movies.service';
import { Movie } from '../../../models/movie.model'
import { Genre } from '../../../models/genre.model';
import { Actor } from '../../../models/actor.model'

@Component({
  selector: 'app-movie-thumbnail',
  templateUrl: './movie-thumbnail.component.html',
  styleUrls: ['./movie-thumbnail.component.css']
})
export class MovieThumbnailComponent implements OnInit {

    @Input() currentMovie: Movie;
    flip: boolean;
    photo: string;
    list: Movie[] = [];
    cur:Movie;

    constructor(private omdb: OmdbMoviesService) {
      this.flip = false;
      /*this.list = JSON.parse(localStorage.getItem('movies'))
      let i:number = 0;
      let j:number = 0;
      for(i; i < this.list.length; i++){
        for(j = i + 1; j < this.list.length; j++){
          if(this.list[j].imdbID === this.list[i].imdbID){
            this.list.splice(j, 1)
          }
        }
      }
      console.log(this.list.length)
      localStorage.setItem('movies', JSON.stringify(this.list))*/
      /*this.omdb.getMovieByImdbID("tt0102926")
      .subscribe(
        res => {
          this.cur = <Movie>res;

          this.list = JSON.parse(localStorage.getItem('movies'))

          console.log(this.list)
          this.list.push(this.cur)
          localStorage.setItem('movies', JSON.stringify(this.list))
        },
        error => {
          console.log("Error: ", error);
        }
      );*/
    }

    ngOnInit() {
      //console.log("hamadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      //console.log(this.currentMovie.imdbRating)
      this.exctractGenres()
      this.exctractActors()
      this.photo = `url(${this.currentMovie.Poster})`
    }

    exctractGenres(){
      this.currentMovie.Genres = [];
      var li = this.currentMovie.Genre.split(', ')
      li.forEach((gn, index) => {
        let gnr:Genre = new Genre();
        gnr.Name = gn;
        this.currentMovie.Genres.push(gnr)
      })
      //console.log(li)
    }

    exctractActors(){
      this.currentMovie.ActorsList = [];
      var li = this.currentMovie.Actors.split(', ')
      li.forEach((ac, index) => {
        if(index <= 1){
          let actr: Actor = new Actor();
          actr.Name = ac;
          this.currentMovie.ActorsList.push(actr)
        }
      })
      //console.log(li)
    }

}
