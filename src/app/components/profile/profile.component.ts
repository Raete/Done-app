import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
// services
import { ListService } from '../../services/list.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
// angular material
import { MatDialog } from '@angular/material';
// components
import { AddListComponent } from '../../components/add-list/add-list.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor (
        private listService: ListService,
        private userService: UserService,
        private authService: AuthService,
        private taskService: TaskService,
        private router: Router,
        public  dialog: MatDialog,
    ){}

    // data
    username: string;
    today: any = moment(Date.now()).format('LL');
   
    lists = [];
    listID: string;

    tasks: any;
    taskSum: number;
    subTitleTask: any

    feedback: string
 
    ngOnInit() {

        this.authService.getAuth().subscribe(auth => {
            if(auth) {
                // get username
                this.userService.userProfile(auth.uid).valueChanges().subscribe(snapshot => {
                    snapshot.forEach((doc:any) => {
                        this.username = doc.username
                    })
                })
                // get user lists
                this.userService.userProfile(auth.uid).get().subscribe(snapshot => {
                    snapshot.forEach((doc:any) => {
            
                        this.listService.getLists(doc.id).subscribe(lists => {
                            this.lists = lists;
                         
                        })

                    })
                })
            } 
            // get tasks sum
            this.taskService.getTaskSum(auth.uid).valueChanges().subscribe(snapshot => {
                this.taskSum = snapshot.length   
            })
        });
    } 
    // set text in list based on task numbers
    setText(taskSum){
        // if is only 1 task
        if (taskSum == 1) {
            this.subTitleTask = `${taskSum} task left`
        } 
        // if there is no task
        else if (!taskSum) {
            this.subTitleTask = `Everything is done.`
        } 
        // if is more then 1 task
        else {
            this.subTitleTask = `${taskSum} tasks left`
        }

        return this.subTitleTask

    }

    // logout
    logOut() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    // delete list
    deleteList(id) { 
        this.listService.deleteList(id);
        this.lists = this.lists.filter(item =>{
            return item.id != id
        })
        // if is list delete -> delete all task in this list
        this.taskService.getAllTaskInList(id).get().subscribe(snapshot => {
            snapshot.forEach((doc:any) => {
                this.taskService.deleteTask(doc.id)
            })
        })
    }
    // add new list
    addNewList(): void {
        this.dialog.open(AddListComponent, {
            // custom style (reset padding)
            panelClass: 'done_custom_dialog_style', 
        });
    }
}
