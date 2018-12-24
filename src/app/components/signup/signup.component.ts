import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
// interface
import { User } from '../../interfaces/User';

@Component({
    selector: 'app-singup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
  
    ) {}

    // data
    user: User = {
        user_id: '',
        username: "",
        date: '',
        email: '',
        password: '',
        slug: '',
    }
    feedback: string;
  
    ngOnInit() {}
  
    signUp() {
        if(this.user.username && this.user.email && this.user.password) {
            //create slug from username
            this.user.slug = this.userService.createSlug(this.user.username);
            
            this.userService.dbWithUserSlug(this.user.slug).get().subscribe(doc => {
                if (doc.exists) {
                    this.feedback = "This username already exists."
                } else {
                    // sign up
                    this.authService.signUp(this.user.email, this.user.password)
                    .then(cred=> {

                        // set data about user
                        this.userService.dbWithUserSlug(this.user.slug).set({
                            user_id: cred.user.uid,
                            username: this.user.username,
                            date: Date.now(),
                            email: this.user.email,
                            password: this.user.password,
                            slug: this.user.slug
                        })

                    }).then(() => {
                        this.router.navigate(['/profile']);
                    })
                    .catch(err => {
                        this.feedback = err.message
                    })
                }
            })

        } else {
            this.feedback = 'Please fill in all fields'
        }
    }
}