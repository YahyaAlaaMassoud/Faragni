import { Movie } from './movie'

export class Recommendation {
  ByUserID: number;
  ToUserID: number;
  Movies: Movie[];
}
