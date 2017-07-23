import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './authentication.service';
import { TheMovieDBService } from './themoviedb.service';
import { IMovie } from './movie.model';
import { Subscription } from 'rxjs/Subscription';
import { fadeInAnimation } from './animations/index';

@Component({
  selector: 'user-collection-component',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss'],
  animations: [fadeInAnimation]
})
export class UserCollectionComponent implements OnInit {
  private userParamId: string;
  private collectionId: string;
  private currentUser: string;
  private searchInput: string;
  private collectionTitle: FirebaseObjectObservable<any>;
  private searchResults: Array<Object>;
  private currentMovies: FirebaseListObservable<any>;
  private titleValue: string;
  private showSearch: boolean;
  private subColTitle: Subscription;
  private subColList: Subscription;

  constructor(
    private http: Http,
    private _route: ActivatedRoute,
    private db: AngularFireDatabase,
    private authenticationService: AuthenticationService,
    private tmdbService: TheMovieDBService
  ) {}

  ngOnInit(): void {

    this.authenticationService.getUser().subscribe(

      auth => {
        if (auth) {

          this.currentUser = auth.uid;
          this.userParamId = this._route.snapshot.params['uid'];
          this.collectionId = this._route.snapshot.params['collectionId'];
          this.collectionTitle = this.db.object('users/' + this.userParamId + '/collections/' + this.collectionId + '/collectionTitle', { preserveSnapshot: true });
          this.subColTitle = this.collectionTitle.subscribe(snapshot => { this.titleValue = snapshot.val(); });

          this.subColList = this.db.object('users/' + this.userParamId + '/collections/' + this.collectionId + '/collectionList').subscribe((obj) => {
            if (obj.$exists()) {
              // check if any movies are in the collection
              this.currentMovies = this.db.list('users/' + this.userParamId + '/collections/' + this.collectionId + '/collectionList');
            } else {
             // no movies in collection
             this.currentMovies = null;
            }
          });
          this.showSearch = false;

        }
      }
    );
  }

  toggleSearch() {
    if (!this.showSearch) {
      this.showSearch = true;
    } else {
      this.showSearch = false;
    }
  }

  searchSubmit() {
    this.tmdbService.searchMovies(this.searchInput)
    .subscribe(
      (response) => {
        this.searchResults = response.results;
        // console.log(this.searchResults);
      },
      (error) => {
        console.log('error = ' + JSON.stringify(error, null, 2));
    });
  }

  titleChange() {
    let updates = {};
    updates['/collections/' + this.collectionId + '/collectionTitle'] = this.titleValue;
    updates['users/' + this.userParamId + '/collections/' + this.collectionId + '/collectionTitle'] = this.titleValue;
    this.db.object('/').update(updates);
  }

  addNewMovie(movie: IMovie) {
    let movieList = this.db.object('/collections/' + this.collectionId + '/collectionList/' + movie.id);
    firebase.database().ref('users/' + this.userParamId + '/collections/' + this.collectionId + '/collectionList/' + movie.id).transaction( function(currentData: IMovie) {
      if (currentData === null) {
        let fbMovie = {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          overview: movie.overview
        };
        movieList.set(fbMovie);
        return fbMovie;
      } else {
        console.log('Movie already exists.');
        return; // abort the transaction.
      }
    }, function(error: any, committed: any, snapshot: any) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because movie already exists).');
      } else {
        console.log('Movie added!');
      }
    });
  }

  deleteMovie(movie: IMovie) {
    let movieKey = movie.$key;
    let deleteMovieArray = [
      this.db.object('/collections/' + this.collectionId + '/collectionList/' + movieKey),
      this.db.object('/users/' + this.userParamId + '/collections/' + this.collectionId + '/collectionList/' + movieKey)
    ];
    for (let movieToDelete of deleteMovieArray){ movieToDelete.remove(); }
  }

  ngOnDestroy(){
   this.subColTitle.unsubscribe();
   this.subColList.unsubscribe();
  }
}
