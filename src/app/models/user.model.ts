import { Rating } from './rating.model';
import { Recommendation } from './recommendation.model';
import { Movie } from './movie.model';
import { Url } from 'url';

export class User {
  UserID: number;
  MovieRatings: Rating[];
  RatedMovies: Movie[];
  FirstName: string;
  LastName: string;
  UserName: string;
  JoiningDate: Date;
  Email: string;
  Age: number;
  DateOfBirth: Date;
  Friends: User[];
  Recommended: Recommendation[];
  Password: string;
  token: string;
  WatchList: Movie[];
  profilePic_url: string; 
  coverPic_url: string;
  Followers: User[];
  Following: User[];
  bio: string;
}
