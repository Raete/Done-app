import { Injectable } from '@angular/core';
// firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// interface
import { List } from '../interfaces/List';

@Injectable()

export class ListService {

    constructor(
        private afs: AngularFirestore
    ) { 
        this.listsCollection = this.afs.collection('lists');
      }

    // data
    listsCollection: AngularFirestoreCollection<List>;
    listDoc: AngularFirestoreDocument<List>;
    lists: Observable<List[]>;
    list: Observable<List>;


    //** used in: list-header component, edit list component
    // get list based on list id
    getList(id: string): Observable<List> {
        this.listDoc = this.afs.doc<List>(`lists/${id}`);
        this.list = this.listDoc.snapshotChanges().pipe(map(action => {
        if(action.payload.exists === false) {
            return null;
        } else {
            const data = action.payload.data() as List;
            data.id = action.payload.id;
            return data;
        }
        }));

        return this.list;
    }

    //** used in: profile component
    // get all user's lists
    getLists(uid): Observable<List[]> {
    
        this.lists = this.afs.collection('lists', ref => {
            // ordered tasks
            let query : firebase.firestore.Query = ref;
                query = query.where('owner', '==', uid) 
                query = query.orderBy('create', 'desc')
            return query;

        }).snapshotChanges().pipe(map(changes => {
            return changes.map(action => {
                const data = action.payload.doc.data() as List;
                data.id = action.payload.doc.id;
                return data;
            });
        }));

        return this.lists;
    }z

    //** used in: profile component
    deleteList(id) {
        this.listsCollection.doc(id).delete();
    }

    //** used in: add list component, edit list component, list component
    listDatabase(){
        return this.listsCollection
    }
}