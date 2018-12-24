import { Component, OnInit } from '@angular/core';

// servises
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    
    constructor(
        private authService: AuthService,
    ) {}
    
    // data
    login: any

    ngOnInit(){
        // check if user is login
        this.authService.getAuth().subscribe(auth => {
            this.login = auth
        })
    }

}