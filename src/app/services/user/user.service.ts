import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from '../../services/custom-http-service/custom-http-service.service';

import { User } from '../../models/user.model';
import { Rating } from '../../models/rating.model';
import { Recommendation } from '../../models/recommendation.model';
import { Movie } from '../../models/movie.model';

@Injectable()
export class UserService {

    constructor(private http: HttpService) { }

    getAll() {
        return this.http.get('users')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    getById(id: number) {
        return this.http.get('users/' + id)
                        .map(res => <User>res.json())
                        .catch(this.handleError)
    }

    getByIDWithRatings(id: number){
        return Observable.forkJoin([
            this.http.get('users/' + id)
                     .map(res => <User>res.json()),
            this.http.get('users/' + id + '/ratings')
                     .map(res => <Rating[]>res.json())
        ])
        .map((data: any[]) => {
            let user: User = data[0];
            let movieRatings: Rating[] = data[1];
            user.MovieRatings = movieRatings;
            return user;
        })
    }

    getByIdWithAllData(id: number){
        return Observable.forkJoin([
            this.http.get('users/' + id)
                     .map(res => <User>res.json()),
            this.http.get('users/' + id + '/ratings')
                     .map(res => <Rating[]>res.json()),
            this.http.get('users/' + id + '/followers')
                     .map(res => <User[]>res.json()),
            this.http.get('users/' + id + '/followings')
                     .map(res => <User[]>res.json()),
            this.http.get('user/watchlist')
                     .map(res => <Movie[]>res.json())
        ])
        .map((data: any[]) => {
            let user: User = data[0];
            let movieRatings: Rating[] = data[1];
            let followers: User[] = data[2];
            let followings: User[] = data[3];
            let watchlist: Movie[] = data[4];
            user.MovieRatings = movieRatings;
            user.Followers = followers;
            user.Following = followings;
            user.WatchList = watchlist;
            return user;
        })
        .catch(this.handleError)
    }

    getAuthenticatedUser() {
        return Observable.forkJoin([
            this.http.get('user')
                     .map(res => <User>res.json()),
            this.http.get('user/followers')
                     .map(res => <User[]>res.json()),
            this.http.get('user/followings')
                     .map(res => <User[]>res.json())
        ])
        .map((data: any[]) => {
            let authUser: User = data[0];
            let authUserFollowers: User[] = data[1];
            let authUserFollowings: User[] = data[2];
            authUser.Followers = authUserFollowers;
            authUser.Following = authUserFollowings;
            return authUser;
        })
    }

    getFollowersForAuthenticatedUser() {
        return this.http.get('user/followers')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    getFollowersForUser(id: number) {
        return this.http.get('users/' + id + '/followers')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    getFollowingsForAuthenticatedUser() {
        return this.http.get('user/followings')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    getFollowingsForUser(id: number) {
        return this.http.get('users/' + id + '/followings')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    followUser(id: number) {
        return this.http.get('users/' + id + '/follow')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    unfollowUser(id: number) {
        return this.http.get('users/' + id + '/unfollow')
                        .map(res => <User[]>res.json())
                        .catch(this.handleError)
    }

    isFollowing(id: number) {
        return this.http.get('users/' + id + '/follows_him')
                        .map(res => <boolean>res.json())
                        .catch(this.handleError)
    }

    isFollower(id: number) {
        return this.http.get('users/' + id + '/follows_me')
                        .map(res => <boolean>res.json())
                        .catch(this.handleError)
    }

    create(user: User) {
        return this.http.post('users', JSON.stringify(user))
                        .map(res => <User>res.json())
                        .catch(this.handleError)
    }

    update(user: User) {
        return this.http.put('users/' + user.UserID, JSON.stringify(user))
                        .map(res => <User>res.json())
                        .catch(this.handleError)
    }

    getWatchlist() {
        return this.http.get('user/watchlist')
                        .map(res => <Movie[]>res.json())
                        .catch(this.handleError)
    }

    getAllRecommendations() {
        return this.http.get('user/recommendations')
                        .map(res => <Recommendation[]>res.json())
                        .catch(this.handleError)
    }

    getRecommendationByID(id: number) {
        return this.http.get('user/recommendations/' + id)
                        .map(res => <Recommendation>res.json())
                        .catch(this.handleError)
    }

    updateRecommendation(id: number, entity: Recommendation) {
        return this.http.put('recommendations/' + id + '/rate', JSON.stringify(entity))
                        .map(res => <Recommendation>res.json())
                        .catch(this.handleError)
    }

    getRecommendationsByStatus(status: string) {
        return this.http.get('user/recommendations/status/' + status)
                        .map(res => <Recommendation[]>res.json())
                        .catch(this.handleError)
    }

    getNewRecommendations() {
        return this.http.get('user/get_new_recommendations')
                        .map(res => <Recommendation[]>res.json())
                        .catch(this.handleError)
    }
    
    getRatingsForCurrentUser() {
        return this.http.get('user/ratings')
                        .map(res => <Rating[]>res.json())
                        .catch(this.handleError)
    }

    getRatingsForUser(id: number) {
        return this.http.get('users/' + id + '/ratings')
                        .map(res => <Rating[]>res.json())
                        .catch(this.handleError)
    }

    rateMovie(entity: Rating) {
        return this.http.post('user/ratings', JSON.stringify(entity))
                        .map(res => <Rating>res.json())
                        .catch(this.handleError)
    }

    updateRating(id: number, entity: Rating) {
        return this.http.put('user/ratings/' + id, JSON.stringify(entity))
                        .map(res => <Rating>res.json())
                        .catch(this.handleError)
    }

    deleteRating(id: number) {
        return this.http.delete('user/ratings/' + id)
                        .map(res => <Rating[]>res.json())
                        .catch(this.handleError)
    }

    recommendToUser(id: number, entity: Recommendation) {
        return this.http.post('users/' + id + '/recommend', JSON.stringify(entity))
                        .map(res => <Recommendation>res.json())
                        .catch(this.handleError)
    }

    delete(id: number) {
        return this.http.delete('users/' + id)
                        .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
