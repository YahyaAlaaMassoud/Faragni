import { Rating } from './rating.model';
import { Recommendation } from './recommendation.model';
import { Movie } from './movie.model';

export class User {
  UserID: number;
  MovieRatings: Rating[];
  FirstName: string;
  LastName: string;
  UserName: string;
  JoiningDate: Date;
  Email: string[];
  Age: number;
  Friends: User[];
  Recommended: Recommendation[];
  Password: string;
  token: string;
  WatchList: string[];
}
