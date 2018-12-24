import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
// servises
import { ListService } from '../../services/list.service';
// interface
import { List } from '../../interfaces/List';
// angular material
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-edit-list',
    templateUrl: './edit-list.component.html',
    styleUrls: ['./edit-list.component.scss']
})

export class EditListComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private listService: ListService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private thisDialog: MatDialogRef<EditListComponent>
    ) {}

      // data
    today: any = moment(Date.now()).format('LL');
    id: string;
    list: List = {
        id: '',
        title: '',
        info: '',
        date: '',
        owner: '',
        all_task: 0,
        todo_task: 0,
        done_task: 0,
    }
    feedback: string;

    ngOnInit() {
        // get list id from route
        this.id = this.route.snapshot.params['id'];

        // get list data form firebase
        this.listService.getList(this.data.id).subscribe(list => {
            if(list) {
                this.list = list;
            }
        });
    }

    editList(id){
        if (this.list.title) {
            // update list data in database
            this.listService.listDatabase().doc(id).update({
                title: this.list.title,
                info: this.list.info,
                date: this.list.date
            })
            // close dialog
            this.thisDialog.close()
        } else {
            this.feedback = "Title is required."
        }
    }

    // get date from date picker
    getDate(event) {
        if (event.value) {
            this.list.date = moment(event.value._d).format('LL')
        } else {
            this.list.date = ''
        }
    }

    // remove deadline
    removeDeadline() {
        this.list.date = ""
    }
}
