import { Movie } from './movie.model'

export class Recommendation {
  RecommendationID: number;
  ByUserID: number;
  ToUserID: number;
  MovieID: number;
  ExpectedRating: number;
  UserRating: number;
  Message: string;
}
