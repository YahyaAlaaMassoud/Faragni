//modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';


//services
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth-guard/auth-guard.guard';
import { fakeBackendProvider } from './services/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//routing
import { appRoutes } from './app.routing';

import 'jquery';
import { MoviesComponent } from './components/movies/movies.component';
import { ActivityComponent } from './components/activity/activity.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    AlertModule.forRoot(),
    ToasterModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    UserService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
