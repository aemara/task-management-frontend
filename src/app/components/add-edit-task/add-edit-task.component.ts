import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css'],
})
export class AddEditTaskComponent implements OnInit {
  @Output() hideAddEditTask = new EventEmitter<any>();
  @Input() addOrEditTask!: string;
  taskForm!: FormGroup;
  listOfColumns!: any[];
  selectedColumn!: string;
  selectedColumnId!: string;
  displayDropdown: boolean = false;
  boardId!: string;
  taskId!: string;
  currentTaskTitle!: string;
  currentTaskDescription!: string;
  currentTaskSubtasks!: any;
  currentTaskColumnId!: string;
  currentTaskColumn!: string;
  constructor(
    private http: HttpService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardId = this.uiService.boardId;
    this.http.getColumns(this.boardId).subscribe((data) => {
      this.listOfColumns = data.columns;
    });

    if (this.addOrEditTask === 'add') {
      this.taskForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        subtasks: new FormArray([
          new FormGroup({
            subtask: new FormControl(null, Validators.required),
            done: new FormControl(false),
          }),
          new FormGroup({
            subtask: new FormControl(null, Validators.required),
            done: new FormControl(false),
          }),
        ]),
        column: new FormControl(null, Validators.required),
      });
    } else {
      this.uiService.taskDisplay$.subscribe((taskData) => {
        this.taskId = taskData.task._id;
        this.currentTaskTitle = taskData.task.title;
        this.currentTaskDescription = taskData.task.description;
        this.currentTaskSubtasks = taskData.task.subtasks;
        this.currentTaskColumnId = taskData.columnId;
        this.currentTaskColumn = taskData.columnName;
        this.selectedColumn = taskData.columnName;
      });

      const currentSubtasksFormControls: any = [];
      this.currentTaskSubtasks.forEach((subtask: any) => {
        const formGroup = new FormGroup({
          subtask: new FormControl(subtask.name, Validators.required),
          done: new FormControl(subtask.done),
        });
        currentSubtasksFormControls.push(formGroup);
      });
      this.taskForm = new FormGroup({
        title: new FormControl(this.currentTaskTitle, Validators.required),
        description: new FormControl(
          this.currentTaskDescription,
          Validators.required
        ),
        subtasks: new FormArray(currentSubtasksFormControls),
        column: new FormControl(this.currentTaskColumn, Validators.required),
      });
    }
  }

  onAddSubtask() {
    const group = new FormGroup({
      subtask: new FormControl(null, Validators.required),
      done: new FormControl(false),
    });
    (<FormArray>this.taskForm.get('subtasks')).push(group);
  }

  getSubtasksControls() {
    return (<FormArray>this.taskForm.get('subtasks')).controls;
  }

  onDeleteSubtask(index: number) {
    (<FormArray>this.taskForm.get('subtasks')).removeAt(index);
  }

  onSelectColumn(column: string, columnId: string) {
    this.selectedColumnId = columnId;
    this.selectedColumn = column;
    this.taskForm.get('column')?.setValue(column);
    this.displayDropdown = false;
  }

  onToggleDropdown() {
    if (this.displayDropdown) {
      this.displayDropdown = false;
    } else {
      this.displayDropdown = true;
    }
  }

  onHideAddEditTask(event: any) {
    if (event.target.className === 'add-edit-task-modal') {
      this.hideAddEditTask.emit();
    }
  }

  onSubmit() {
    if (this.addOrEditTask === 'add') {
      const subtasks: any[] = [];
      if (this.taskForm.value.subtasks.length > 0) {
        this.taskForm.value.subtasks.forEach((subtaskObject: any) => {
          const subtask = {
            name: subtaskObject.subtask,
            done: subtaskObject.done,
          };
          subtasks.push(subtask);
        });
      }

      const task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        subtasks: subtasks,
      };

      this.http.addTask(task, this.selectedColumnId).subscribe(() => {
        this.hideAddEditTask.emit();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      });
    } else {
      const newData: any = {};
      const subtasks: any = [];
      newData['newTitle'] = this.taskForm.value.title;
      newData['newDescription'] = this.taskForm.value.description;
      this.taskForm.value.subtasks.forEach((subtaskObject: any) => {
        const subtask = {
          name: subtaskObject.subtask,
          done: subtaskObject.done,
        };
        subtasks.push(subtask);
      });
      newData['newSubtasks'] = subtasks;
      if (this.selectedColumnId !== this.currentTaskColumnId) {
        newData['newColumnId'] = this.selectedColumnId;
        newData['currentColumnId'] = this.currentTaskColumnId;
      }
      this.http.editTask(this.taskId, newData).subscribe(() => {
        this.hideAddEditTask.emit();
        this.router.navigate([this.router.url]);
      });
    }
  }
}
