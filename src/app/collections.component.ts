import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { fadeInAnimation } from './animations/index';

@Component({
  selector: 'collections-component',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  animations: [fadeInAnimation]
})
export class CollectionsComponent implements OnInit {
  private collections: FirebaseListObservable<any>;

  constructor(
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.collections = this.db.list('/collections');
  }
}
