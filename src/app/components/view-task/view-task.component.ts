import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  taskId!: string;
  taskTitle!: string;
  taskDescription!: string;
  currentColumn!: string;
  columnId!: string;
  subtasks = [];
  numOfSubtasks!: number;
  numOfSubtasksDone = 0;
  

  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['id'];
    });

    this.http.getTask(this.taskId).subscribe(data => {
      this.taskTitle = data.task[0].title;
      this.taskDescription = data.task[0].description;
      this.currentColumn = data.task[0].column;
      this.columnId = data.task[0].columnId;
    })

    this.http.getSubtasks(this.taskId).subscribe(data => {
      this.subtasks = data.subtasks;
      this.numOfSubtasks = this.subtasks.length;
      this.subtasks.forEach((subtask:any) => {
        if(subtask.done) this.numOfSubtasksDone++;
      })
    })  
  }

  updateDoneCount(input: string) {
    if(input === 'true') {
      this.numOfSubtasksDone++;
    } else {
      this.numOfSubtasksDone--;
    }
  }
}
