import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

// services
import { ListService } from '../../services/list.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
// material design
import {MatDialogRef } from '@angular/material';
// interfaces
import { List } from '../../interfaces/List';

@Component({
    selector: 'app-add-list',
    templateUrl: './add-list.component.html',
    styleUrls: ['./add-list.component.scss']
})

export class AddListComponent implements OnInit {

    constructor(
        private listService: ListService,
        private userService: UserService,
        private authService: AuthService,
        private thisDialog: MatDialogRef<AddListComponent>
    ) {}

    // data
    currentUserId: string;

    today: any = Date.now();
    date: any;

    list: List = {
        id: '',
        title: '',
        info: '',
        date: '',
        owner: '',
        all_task: 0,
        todo_task: 0,
        done_task: 0,
        create: '',
    }

    feedback: string;

    @ViewChild('listForm') form: any;

    ngOnInit() {

        this.authService.getAuth().subscribe(user => {
            // get user id
            this.currentUserId = user.uid
            this.userService.userProfile(this.currentUserId).valueChanges().subscribe(snapshot => {
                snapshot.forEach((doc:any) => {
                    // create owner name
                    this.list.owner = this.userService.createSlug(doc.username)
                })
            })
        })
    }
    // get date from date picker
    getDate(event) {
        if (event.value) {
            this.list.date = moment(event.value._d).format('LL')
        } else {
            this.list.date = ''
        }
    }

    // add new list and store in database
    addNewList() {
        if (this.list.title) {
            // get data from form
            this.listService.listDatabase().add({
                id: this.list.id,
                title: this.list.title,
                info: this.list.info,
                date: this.list.date,
                owner: this.list.owner,
                all_task: 0,
                todo_task: 0,
                done_task: 0,
                create: Date.now()
            })
            // close dialog
            this.thisDialog.close()

        } else {
            this.feedback = "Title is required."
        }
        // reset list title
        this.list.title = ''
    }

    // remove deadline
    removeDeadline() {
        this.list.date = ""
    }
}
