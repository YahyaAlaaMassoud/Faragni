import { Movie } from './movie.model'

export class Recommendation {
  RecommendationID: number;
  ByUserID: number;
  ToUserID: number;
  MovieID: string;
  ExpectedRating: number;
  UserRating: number;
  Message: string;
}
