import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  currentColumnId!: string;
  boardId!: string;
  subtasks = [];
  numOfSubtasks!: number;
  numOfSubtasksDone = 0;
  showColumnDropdown: boolean = false;
  showEditDropdown: boolean = false;
  isFetching!: boolean;
  taskDisplaySub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private ui: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskDisplaySub = this.ui.taskDisplay$.subscribe((taskData) => {
      this.currentColumn = taskData.columnName;
      this.currentColumnId = taskData.columnId;
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
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  changeCurrentColumn(column: string, newColumnId: string) {
    this.isFetching = true;
    this.currentColumn = column;
    this.http
      .changeColumn(this.taskId, this.currentColumnId, newColumnId)
      .subscribe(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
        this.isFetching = false;
        // this.hideTask.emit();
      });
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
    this.showAddEditTask.emit('edit');
  }

  onClickDeleteTask() {
    this.ui.showDeleteModal('task', this.taskId);
    this.hideTask.emit();
  }

  ngOnDestroy(): void {
    this.taskDisplaySub.unsubscribe();
  }
}
