//modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
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
import { RegisterComponent } from './components/register/register.component';


//services
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth-guard/auth-guard.guard';
import { fakeBackendProvider } from './services/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//routing
import { appRoutes } from './app.routing';
import { LoginSignupModalComponent } from './components/login-signup-modal/login-signup-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelcomeScreenComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LoginSignupModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToastModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    UserService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
