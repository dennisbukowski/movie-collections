import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'collections-component',
  templateUrl: './collections.component.html'
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
