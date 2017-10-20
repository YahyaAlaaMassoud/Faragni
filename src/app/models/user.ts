import { Rating } from './rating'
import { Recommendation } from './recommendation'

export class User {
  UserID: string;
  MovieRatings: Rating[];
  FirstName: string;
  LastName: string;
  UserName: string;
  JoiningDate: Date;
  Email: string[];
  Age: number;
  Friends: User[];
  Recommended: Recommendation[];
}
