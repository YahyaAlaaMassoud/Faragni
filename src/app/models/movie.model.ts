import { ProductionCompany } from './production-company.model'
import { Genre } from './genre.model'

export class Movie {
  MovieID: number;
  imdbID: string;
  imdbRating: number;
  imdbVotes: string;
  Title: string;
  TagLine: string;
  ReleaseDate: string;
  ProductionCompanies: ProductionCompany[];
  PosterPath: string;
  Popularity: number;
  Overview: string;
  Language: string;
  Adult: boolean;
  Genres: Genre[];
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Director: string;
  Genre: string;
  Metascore: number;
  Plot: string;
  Poster: string;
  ProductionCompany: string;
  Rating: any[];
  Released: string;
  Runtime: string;
  Website: string;
  Writer: string;
  Year: number;
}
