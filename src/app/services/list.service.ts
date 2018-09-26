import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



import { List } from '../models/List';


@Injectable()
export class ListService {
  listsCollection: AngularFirestoreCollection<List>;
  listDoc: AngularFirestoreDocument<List>;
  lists: Observable<List[]>;
  list: Observable<List>;

  constructor(private afs: AngularFirestore) { 
    this.listsCollection = this.afs.collection('lists');
  }

  getLists(): Observable<List[]> {
  
    this.lists = this.listsCollection.snapshotChanges().pipe(map((changes => {
        return changes.map(action => {
            const data = action.payload.doc.data() as List;
            data.id = action.payload.doc.id;
            return data;
        });
    })));

    return this.lists;
  }
  
}