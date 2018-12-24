import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// servises
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    // data
    login: any

    ngOnInit() {
        
        // check if user is login
        this.authService.getAuth().subscribe(auth => {
            this.login = auth
            // if user if login go to user profile
            if (this.login) {
                this.router.navigate(['/profile']);
            }
        })
        
    }
  
}