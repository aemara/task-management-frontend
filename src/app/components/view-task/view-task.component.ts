import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';

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
  columns!: any[];
  columnId!: string;
  boardId!: string;
  subtasks = [];
  numOfSubtasks!: number;
  numOfSubtasksDone = 0;
  showColumnDropdown: boolean = false;
  showEditDropdown: boolean  = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['id'];
    });

    this.boardId = this.ui.boardId;

    this.http.getBoard(this.boardId).subscribe((data) => {
      this.columns = data.board.columns;
    });

    this.http.getTask(this.taskId).subscribe((data) => {
      this.taskTitle = data.task[0].title;
      this.taskDescription = data.task[0].description;
      this.currentColumn = data.task[0].column;
      this.columnId = data.task[0].columnId;
      this.subtasks = data.task[0].subtasks;
      this.numOfSubtasks = this.subtasks.length;
      this.subtasks.forEach((subtask: any) => {
        if (subtask.done) this.numOfSubtasksDone++;
      });

      /**Here you should fetch the name of its current column */
    });
  }

  updateDoneCount(input: string) {
    if (input === 'true') {
      this.numOfSubtasksDone++;
    } else {
      this.numOfSubtasksDone--;
    }
  }

  changeCurrentColumn(column: string, columnId: string) {
    this.currentColumn = column;
    this.http.changeColumn(this.taskId, columnId).subscribe();
    this.showColumnDropdown = false;
  }

  toggleColumnDropdown() {
    if (this.showColumnDropdown) {
      this.showColumnDropdown = false;
    } else {
      this.showColumnDropdown = true;
    }
  }

  toggleEditDropdown() {
    if (this.showEditDropdown) {
      this.showEditDropdown = false;
    } else {
      this.showEditDropdown = true;
    }
  }
}
