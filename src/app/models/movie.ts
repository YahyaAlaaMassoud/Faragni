import { ProductionCompany } from './production-company'
import { Genre } from './genre'

export class Movie {
  MovieID: number;
  IMDbID: number;
  Title: string;
  TagLine: string;
  VoteAverage: number;
  VoteCount: number;
  ReleaseDate: string;
  ProductionCompanies: ProductionCompany[];
  PosterPath: string;
  Popularity: number;
  Overview: string;
  OriginalTitle: string;
  OriginalLanguage: string;
  Adult: boolean;
  Genres: Genre[];
}
