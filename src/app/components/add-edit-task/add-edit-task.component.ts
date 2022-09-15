import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
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
  displayDropdown: boolean = false;
  boardId!: string;
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.addOrEditTask);
    this.taskForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      subtasks: new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required),
      ]),
      column: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];

      this.http.getColumns(this.boardId).subscribe((data) => {
        this.listOfColumns = data.columns;
        this.selectedColumn = this.listOfColumns[0].title;
        this.taskForm.get('column')?.setValue(this.selectedColumn);
      });
    });
  }

  onAddSubtask() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.taskForm.get('subtasks')).push(control);
  }

  getSubtasksControls() {
    return (<FormArray>this.taskForm.get('subtasks')).controls;
  }

  onDeleteSubtask(index: number) {
    (<FormArray>this.taskForm.get('subtasks')).removeAt(index);
  }

  onSelectColumn(column: string) {
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
    let columnId: any;
    this.listOfColumns.forEach((column) => {
      if (this.taskForm.value.column === column.title) {
        columnId = column._id;
      }
    });

    const subtasks: any[] = [];
    if (this.taskForm.value.subtasks.length > 0) {
      this.taskForm.value.subtasks.forEach((subtaskName: string) => {
        const subtask = { name: subtaskName };
        subtasks.push(subtask);
      });
    }

    const task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      subtasks: subtasks,
    };

    this.http.addTask(task, columnId).subscribe(() => {
      this.router.navigate(['/board', this.boardId]);
    });
  }
}
