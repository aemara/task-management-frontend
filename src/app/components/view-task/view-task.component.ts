import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

    numOfSubtasks!: number;
    numOfSubtasksDone = 0;
    subtasks= [
      {
        title: 'subtask 1',
        isDone: false,
      },
      {
        title: 'subtask 2',
        isDone: false,
      },
      {
        title: 'subtask 3',
        isDone: true,
      }
    ];
  constructor() { }

  ngOnInit(): void {
    this.numOfSubtasks = this.subtasks.length;
    this.subtasks.forEach((subtask) => {
      if(subtask.isDone) {
        this.numOfSubtasksDone++;
      }
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
