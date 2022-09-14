import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: any;
  @Input() columnOfTask: any;
  taskName!: string;
  taskId!: string;
  subtasks!: any[];
  numOfSubtasks!: number;
  doneSubtasks: number = 0;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.taskName = this.task.title;
    this.taskId = this.task._id;
    this.subtasks = this.task.subtasks;
    this.numOfSubtasks = this.subtasks.length;
    this.countSubtasksDone(this.subtasks);
  }

  countSubtasksDone(listOfSubtasks: any[]) {
    listOfSubtasks.forEach((subtask) => {
      if (subtask.done) {
        this.doneSubtasks++;
      }
    });
  }
}
