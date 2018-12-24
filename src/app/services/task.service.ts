import { Injectable } from '@angular/core';
// firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// interface
import { Task } from '../interfaces/Task';

@Injectable({providedIn: 'root'})

export class TaskService {

    constructor(
        private afs: AngularFirestore
    ) {
        this.tasksCollection = this.afs.collection('tasks');
    }

    // data
    tasksCollection: AngularFirestoreCollection<Task>;
    taskDoc: AngularFirestoreDocument<Task>;
    tasks: Observable<Task[]>;
    task: Observable<Task>;

    //** used in: list-header component
    getTasks(listID): Observable<Task[]> {
        // get all tasks based on list id
        this.tasks = this.afs.collection('tasks', ref => ref.where('listID', '==', listID)).snapshotChanges().pipe(map(changes => {
            return changes.map(action => {
                const data = action.payload.doc.data() as Task;
                data.id = action.payload.doc.id;
                return data;
            });
        }));

        return this.tasks;
    }

    //** used in: list component
    getAllTasks(listID): Observable<Task[]> {
        // get all task based on list id in order
        this.tasks = this.afs.collection('tasks', ref => {
            // ordered tasks
            let query : firebase.firestore.Query = ref;
                query = query.where('listID', '==', listID) 
                query = query.orderBy('status', 'desc')
                query = query.orderBy('createDate', 'desc');
            return query;

        }).snapshotChanges().pipe(map(changes => {
            return changes.map(action => {
                const data = action.payload.doc.data() as Task;
                data.id = action.payload.doc.id;
                return data;
            });
        }));

        return this.tasks;
    }

    //** used in: list component
    getOrderedTasks(listID, status) {
        // get to-do or done task based on list id in order
        this.tasks = this.afs.collection('tasks', ref => {

                let query : firebase.firestore.Query = ref;
                    query = query.where('listID', '==', listID) 
                    query = query.where('status', '==', status) 
                    query = query.orderBy('createDate', 'desc');
                return query;

        }).snapshotChanges().pipe(map(changes => {
            return changes.map(action => {
                const data = action.payload.doc.data() as Task;
                data.id = action.payload.doc.id;
                return data;
            });
        }));

        return this.tasks;
    }

    //** used in: profile component
    getTaskSum(userID: string) {
        return this.afs.collection('tasks', ref => ref.where('userID', '==', userID))
    }

    //** used in: profile component
    getAllTaskInList(listID: string) {
        return this.afs.collection('tasks', ref => ref.where('listID', '==', listID))
    }

    //** used in: profile component, list component
    deleteTask(id) {
        this.tasksCollection.doc(id).delete();
    }

    //** used in: list component
    taskDatabase(){
        return this.tasksCollection
    }
}
