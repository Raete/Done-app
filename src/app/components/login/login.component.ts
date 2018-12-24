import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
// interface
import { User } from '../../interfaces/User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
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
  
    onSubmit() {
        // if all fields are filled
        if (this.user.email && this.user.password) {
            this.feedback = null
            // login user
            this.authService.login(this.user.email, this.user.password)
            .then(cred => {
                
                this.authService.getAuth().subscribe(auth => {
        
                    this.userService.userProfile(auth.uid).get()
                    .subscribe(snapshot => {
                        snapshot.forEach(doc => {
                            this.router.navigate(['/profile']);
                        })
                    })
                })
            })
            .catch(err => {
                this.feedback = err.message
            })
       
        } else {
            this.feedback = 'Please fill in all fields'
        }
    }
}
