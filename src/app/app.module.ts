import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing } from './routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { environment } from '../environments/environment';

import 'rxjs/Rx';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { AuthenticationComponent } from './authentication.component';
import { CollectionComponent } from './collection.component';
import { CollectionsComponent } from './collections.component';
import { ProfileComponent } from './profile.component';
import { UserCollectionComponent } from './user-collection.component';

import { AuthenticationService } from './authentication.service';
import { TheMovieDBService } from './themoviedb.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    AuthenticationComponent,
    CollectionComponent,
    CollectionsComponent,
    ProfileComponent,
    UserCollectionComponent
  ],
  providers: [
    AuthenticationService,
    TheMovieDBService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
