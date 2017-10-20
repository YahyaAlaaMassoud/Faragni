import { ProductionCompany } from './production-company.model'
import { Genre } from './genre.model'

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
