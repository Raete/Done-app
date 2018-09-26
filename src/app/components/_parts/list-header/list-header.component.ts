import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})

export class ListHeaderComponent implements OnInit {
    //variables
    currentUrl: string;

    constructor(private router: Router) { 
        // setting current item in navbar
        router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
    }

    ngOnInit() {
     
    }

}
