import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, RootComponent } from './routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { environment } from '../environments/environment';
import 'rxjs/Rx';

import { HeaderComponent } from './header.component';
import { WelcomeComponent } from './welcome.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { CollectionsComponent } from './collections.component';
import { ProfileComponent } from './profile.component';
import { UserCollectionComponent } from './user-collection.component';

import { CurrentUserService } from './current-user.service';
import { TheMovieDBService } from './themoviedb.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    RootComponent,
    HeaderComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    CollectionsComponent,
    ProfileComponent,
    UserCollectionComponent
  ],
  providers: [
    CurrentUserService,
    TheMovieDBService,
    AuthGuard
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
