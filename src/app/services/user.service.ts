import { Injectable } from '@angular/core';
// firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import slugify from 'slugify'
// interfase
import { User } from '../interfaces/User';

@Injectable()
export class UserService {

    constructor(
        private afs: AngularFirestore
    ) { 
        this.usersCollection = this.afs.collection('users');
    }

    // data
    usersCollection: AngularFirestoreCollection<User>;
    userDoc: AngularFirestoreDocument<User>;
    users: Observable<User[]>;
    user: Observable<User>;

    slug: string;

    //** used in: add-list component, signup component
    // create slug of username 
    createSlug(username: string) {
        this.slug = slugify(username, {
            replacement: '-',
            remove:/[$*_+~.()'"!\-:@]/g,
            lower: true
        })
        return this.slug
    }

    //** used in: signup component
    // users database with user's slug
    dbWithUserSlug(slug: string) {
        return this.usersCollection.doc(slug)
    }

    //** used in: add-list component, login component, profile component
    // profile of single user
    userProfile(uid: string) {
        return this.afs.collection('users', ref => ref.where('user_id', '==', uid))
    }
}