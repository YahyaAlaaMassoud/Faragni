// modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { SuiModule, SuiSidebarModule, SuiRatingModule, SuiSearchModule } from 'ng2-semantic-ui';
import { StarRatingModule } from 'angular-star-rating';
import { CoreModule } from './modules/core-module.module';
import 'hammerjs';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { CustomSelectBoxComponent } from './components/common/custom-select-box/custom-select-box.component';

// services
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { OmdbMoviesService } from './services/omdb/omdb-movies.service';
import { AuthGuard } from './guards/auth-guard/auth-guard.guard';
import { fakeBackendProvider } from './services/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { PagerService } from './services/pager/pager.service';
import { LoaderService } from './services/loader/loader.service';
import { MovieService } from './services/movie/movie.service';
import { GenreService } from './services/genre/genre.service';

// resolvers
import { ProfileResolver } from './services/resolvers/profile.resolver';
import { AllMoviesResolver } from './services/resolvers/movie.resolver';

// routing
import { appRoutes } from './app.routing';

import 'jquery';
import { MoviesComponent } from './components/movies/movies.component';
import { ActivityComponent } from './components/activity/activity.component';
import { MovieThumbnailComponent } from './components/movies/movie-thumbnail/movie-thumbnail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowersComponent } from './components/profile/followers/followers.component';
import { RatedMoviesComponent } from './components/profile/rated-movies/rated-movies.component';
import { RatedMovieThumbnailComponent } from './components/profile/rated-movies/rated-movie-thumbnail/rated-movie-thumbnail.component';
import { WatchlistComponent } from './components/profile/watchlist/watchlist.component';
import { RecommendationsComponent } from './components/profile/recommendations/recommendations.component';
import { StarRatingPipePipe } from './pipes/star-rating-pipe.pipe';
import { RecommendationThumbnailComponent } from './components/profile/recommendations/recommendation-thumbnail/recommendation-thumbnail.component';
import { FollowersThumbnailComponent } from './components/profile/followers/followers-thumbnail/followers-thumbnail.component';
import { NotFound404Component } from './components/common/not-found-404/not-found-404.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { FollowingComponent } from './components/profile/following/following.component';
import { FollowingThumbnailComponent } from './components/profile/following/following-thumbnail/following-thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelcomeScreenComponent,
    LoginComponent,
    HomeComponent,
    MoviesComponent,
    ActivityComponent,
    MovieThumbnailComponent,
    ProfileComponent,
    FollowersComponent,
    RatedMoviesComponent,
    RatedMovieThumbnailComponent,
    WatchlistComponent,
    CustomSelectBoxComponent,
    RecommendationsComponent,
    StarRatingPipePipe,
    RecommendationThumbnailComponent,
    FollowersThumbnailComponent,
    NotFound404Component,
    FollowingComponent,
    FollowingThumbnailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    AlertModule.forRoot(),
    ToasterModule,
    SuiModule,
    SuiSidebarModule,
    SuiRatingModule,
    StarRatingModule.forRoot(),
    SuiSearchModule,
    NgbDropdownModule,
    CoreModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    UserService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    OmdbMoviesService,
    ProfileResolver,
    PagerService,
    MovieService,
    GenreService,
    AllMoviesResolver
  ],
  bootstrap: [ AppComponent ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
