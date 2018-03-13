import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { fadeInAnimation } from './animations/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'collection-component',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [fadeInAnimation]
})
export class CollectionComponent implements OnInit {
  private collections: FirebaseListObservable<any>;
  private collectionUid: string;
  private currentCollectionTitle: FirebaseObjectObservable<any>;
  private currentCollectionAuthor: FirebaseObjectObservable<any>;
  private currentMovies: FirebaseListObservable<any>;
  private subColTitle: Subscription;
  private subColAuthor: Subscription;
  private collectionTitle: string;
  private collectionAuthor: string;

  constructor(
    private db: AngularFireDatabase,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.collections = this.db.list('/collections');
    this.collectionUid = this._route.snapshot.params['collectionUid'];

    this.currentCollectionTitle = this.db.object('/collections/' + this.collectionUid + '/collectionTitle', { preserveSnapshot: true });
    this.subColTitle = this.currentCollectionTitle.subscribe(snapshot => {
      this.collectionTitle = snapshot.val(); });

    this.currentCollectionAuthor = this.db.object('/collections/' + this.collectionUid + '/uid', { preserveSnapshot: true });
    this.subColAuthor = this.currentCollectionAuthor.subscribe(snapshot => {
      this.collectionAuthor = snapshot.val(); });

    this.currentMovies = this.db.list('/collections/' + this.collectionUid + '/collectionList');    
  }

  ngOnDestroy(){
   this.subColTitle.unsubscribe();
   this.subColAuthor.unsubscribe();
  }
}
