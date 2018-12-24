import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
// services
import { ListService } from '../../services/list.service';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
// interface
import { Task } from '../../interfaces/Task';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    constructor(
        private listService: ListService,
        private taskService: TaskService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {}
    
    // data
    id: string;
    currentUser: string;
    // tasks list data
    tasks: Task[];
    todoTasks: Task[];
    doneTasks: Task[];

    task:Task = {
        id: "",
        listID: "",
        title: "",
        deadline: "",
        status: true,
        userID: "",
        statusIcon: "panorama_fish_eye"
    }
    // menu
    menu:any = [
        { id: 1, title: "All tasks", sum: 0 },
        { id: 2, title: "To do tasks", sum: 0 },
        { id: 3, title: "Done tasks", sum:0 },
    ]
    activeTab:number = 1

    taskCurrentStatus: boolean;
    feedback:String;

    ngOnInit() {
        // get list id from route
        this.id = this.route.snapshot.params['id'];

        // get user id
        this.authService.getAuth().subscribe(auth => {
            this.currentUser = auth.uid
        })

        // get all tasks in list
        this.taskService.getAllTasks(this.id).subscribe(tasks => {
            if(tasks) {
                this.tasks = tasks;
                // update sum of tasks in list
                this.listService.listDatabase().doc(this.id).get().subscribe(list=>{
                    if(list.exists){
                        this.listService.listDatabase().doc(this.id).update({
                            all_task: tasks.length
                        })
                    }
                })
                // set all task sum
                this.menu.forEach(item => {
                    if(item.id == 1) {
                        item.sum = tasks.length
                    }  
                });
            }
        });

        // get to-do tasks in list
        this.taskService.getOrderedTasks(this.id, true).subscribe(tasks => {
            if(tasks) {
                this.todoTasks = tasks;
                // update sum of tasks in list
                this.listService.listDatabase().doc(this.id).get().subscribe(list=>{
                    if(list.exists){
                        this.listService.listDatabase().doc(this.id).update({
                            todo_task: tasks.length
                        })
                    }
                })
                // set to do task sum
                this.menu.forEach(item => {
                    if(item.id == 2) {
                        item.sum = tasks.length
                    }  
                });
            }
        });

        // get done tasks in list
        this.taskService.getOrderedTasks(this.id, false).subscribe(tasks => {
            if(tasks) {
                this.doneTasks = tasks;
                // update sum of tasks in list
                this.listService.listDatabase().doc(this.id).get().subscribe(list=>{
                    if(list.exists){
                        this.listService.listDatabase().doc(this.id).update({
                            done_task: tasks.length
                        })
                    }
                })
                // set done task sum
                this.menu.forEach(item => {
                    if(item.id == 3) {
                        item.sum = tasks.length
                    }  
                });
            }
        });
    }
    // add new task
    addTask() {

        if(this.task.title) {
            this.feedback = ""
            this.taskService.taskDatabase().add({
                id: "",
                listID: this.id,
                title: this.task.title,
                deadline: this.task.deadline,
                status: true,
                userID: this.currentUser,
                statusIcon: "panorama_fish_eye",
                createDate: Date.now()
            })

            this.task.title = "";
            this.task.deadline = ""
        } else {
            this.feedback = "Title is required."
        }
    }
    // delete task
    deleteThisTask(id) { 
        this.taskService.deleteTask(id);
        this.tasks = this.tasks.filter(item =>{
            return item.id != id
        })
    }
    // change task status (done, to-do)
    changeStatus(id){
        this.taskService.taskDatabase().doc(id).get().subscribe(doc =>{
            if(doc.data().status) {
                // change to done
                this.taskService.taskDatabase().doc(id).update({
                    status: false,
                    statusIcon: "check_circle"
                })
            } else {
                // change to to-do
                this.taskService.taskDatabase().doc(id).update({
                    status: true,
                    statusIcon: "panorama_fish_eye"
                })
            }
        })
    } 
    // get date from datapicker
    getDate(event) {
        if(event.value) {
            this.task.deadline = moment(event.value._d).format('LL')
        } else {
          this.task.deadline = null
        }
    }
    getTabId(id) {
        this.activeTab = id 
    }
   
    

}
