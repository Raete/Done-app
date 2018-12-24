import { Injectable } from '@angular/core';
// firebase
import { AngularFireAuth } from 'angularfire2/auth';

import { map } from 'rxjs/operators';

@Injectable()

export class AuthService {

    constructor(
        private afAuth: AngularFireAuth
    ) {}

    //** used in: profile component, login component
    getAuth() {
        return this.afAuth.authState.pipe(map(auth => auth));
    }

    //** used in: login component, 
    login(email:any, password:any) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    }

    //** used in: sign component, 
    signUp(email:any, password:any) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    }
    //** used in: profile component, menu component
    logout() {
        this.afAuth.auth.signOut();
    }
}
