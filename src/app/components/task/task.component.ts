import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: any;
  taskName!: string;
  taskId!: number;
  subtasks!: any[];
  numOfSubtasks!: number;
  doneSubtasks:number = 0;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.taskName = this.task.title;
    this.taskId = this.task._id;
    this.http.getSubtasks(this.taskId).subscribe(data => {
      this.subtasks = data.subtasks;
      this.numOfSubtasks = this.subtasks.length;
      this.countSubtasksDone(this.subtasks);
    });

  }


  countSubtasksDone(listOfSubtasks: any[]) {
    listOfSubtasks.forEach(subtask => {
      if(subtask.done) {
        this.doneSubtasks++;
      }
    })
  }

}
