import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import slugify from 'slugify'



import { User } from '../models/User';


@Injectable()
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  users: Observable<User[]>;
  user: Observable<User>;
  slug: string;

  constructor(private afs: AngularFirestore) { 
    this.usersCollection = this.afs.collection('users');
  }

  newUser(user: User) {
    this.usersCollection.add(user);
  }

  getSlug(username: string) {
    this.slug = slugify(username, {
        replacement: '-',
        remove:/[$*_+~.()'"!\-:@]/g,
        lower: true
    })
    return this.slug
  }

  userC(){
      return this.usersCollection
  }





  
  
}