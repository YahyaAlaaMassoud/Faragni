import { ProfileResolver } from './services/resolvers/profile.resolver';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { NotFound404Component } from './components/common/not-found-404/not-found-404.component';

import { FollowersComponent } from './components/profile/followers/followers.component';
import { ProfileComponent } from './components/profile/profile.component'
import { ActivityComponent } from './components/activity/activity.component'

import { AuthGuard } from './guards/auth-guard/auth-guard.guard';
import { Profile } from 'selenium-webdriver/firefox';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },//, canActivate: [AuthGuard] }
    { path: 'login', component: LoginComponent },
    { path: 'movies/:screen', component: WelcomeScreenComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent },
    { path: 'profile/:id/:tab' , component: ProfileComponent, resolve: { user: ProfileResolver } },
    { path: 'followers' , component: FollowersComponent},
    { path: '404', component: NotFound404Component},
    

    // otherwise redirect to home
    { path: '**', redirectTo: '404' }
];
