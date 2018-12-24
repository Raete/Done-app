import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//components
import { EditListComponent } from '../../../components/edit-list/edit-list.component';

// servises
import { ListService } from '../../../services/list.service';
import { TaskService } from '../../../services/task.service';

// interface
import { List } from '../../../interfaces/List';

// angular material
import { MatDialog } from '@angular/material';


@Component({
    selector: 'app-list-header',
    templateUrl: './list-header.component.html',
    styleUrls: ['./list-header.component.scss']
})

export class ListHeaderComponent implements OnInit {

    constructor (
        private listService: ListService,
        private taskService: TaskService,
        private route: ActivatedRoute,
        public  dialog: MatDialog,
    ) {}

    // data
    currentUrl: string;
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
    };
    taskSum: any
    
    ngOnInit() {
        // get list id from route
        this.id = this.route.snapshot.params['id'];
        // get list data form firebase
        this.listService.getList(this.id).subscribe(list => {
            if(list) {
                this.list = list;
            }
        });
        // get number of tasks in list from firebase
        this.taskService.getTasks(this.id).subscribe(tasks => {
            if(tasks) {
                this.taskSum = tasks.length
            }
        });
    }
    // open dialog with edit list form
    openEditListDialog(): void {
        this.dialog.open( EditListComponent, {
            // custom style -- remove padding
            panelClass: 'done_custom_dialog_style', 
            // take list id
            data: {
                id: this.id
            }
        });
    }

}
