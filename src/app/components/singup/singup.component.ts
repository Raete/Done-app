import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import { User } from '../../models/User';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

    user: User = {
        id: '',
        username: "",
        date: '',
      }

    email: string;
    password: string;
    username: string;
    slug: string;
  
    constructor(
      private authService: AuthService,
      private userService: UserService,
      private router: Router,

    ) { }
  
    ngOnInit() {
        console.log(this.username)
    }
  
    onSubmit() {
      this.authService.register(this.email, this.password)
        .then(res => {
           this.slug = this.userService.getSlug(this.username)
           

           this.userService.userC().add({
            username: this.username,
     
        })
   
          this.router.navigate(['/profile']);
        })
        .catch(err => {

        });
    }



}
