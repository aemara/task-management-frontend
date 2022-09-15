import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  @Output() hideTask = new EventEmitter<any>();
  @Output() showAddEditTask = new EventEmitter<any>();
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
  showEditDropdown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.ui.taskDisplay$.subscribe((taskData) => {
      this.currentColumn = taskData.columnName;
      this.taskId = taskData.task._id;
      this.taskTitle = taskData.task.title;
      this.taskDescription = taskData.task.description;
      this.subtasks = taskData.task.subtasks;
      this.numOfSubtasks = this.subtasks.length;
      this.countSubtasksDone(this.subtasks);
    });

    this.boardId = this.ui.boardId;
    this.http.getColumns(this.boardId).subscribe((data) => {
      this.columns = data.columns;
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

  countSubtasksDone(subtasks: any[]) {
    subtasks.forEach((subtask) => {
      if (subtask.done) this.numOfSubtasksDone++;
    });
  }

  hideTaskView(event: any) {
    if (event.target.className === 'view-task-modal') {
      this.hideTask.emit();
    }
  }

  onClickEditTask() {
    this.hideTask.emit();
    this.showAddEditTask.emit("edit");
  }
}
