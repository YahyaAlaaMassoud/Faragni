import { Movie } from './movie.model'

export class Recommendation {
  ByUserID: number;
  ToUserID: number;
  Movies: Movie[];
}
