import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../models/List';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    lists: List[];

    isLoggedIn: boolean;
  loggedInUser: string;


  constructor(
      private listService: ListService,
      private authService: AuthService,
      private router: Router,
      ) { }

  ngOnInit() {
     
     this.listService.getLists().subscribe(lists => {
        this.lists = lists;
        console.log(this.lists)
     })

     this.authService.getAuth().subscribe(auth => {
        if(auth) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isLoggedIn = false;
        }
      });
  }



  onLogoutClick() {
    this.authService.logout();

    this.router.navigate(['/']);
  }

}
