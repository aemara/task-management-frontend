import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css'],
})
export class AddEditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  listOfColumns!: any[];
  selectedColumn!: string;
  displayDropdown: boolean = false;
  boardId!: string;
  constructor(private http: HttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];

      this.http.getColumns(this.boardId).subscribe((data) => {
        this.listOfColumns = data.columns;
        this.selectedColumn = this.listOfColumns[0].title;
        this.taskForm = new FormGroup({
          title: new FormControl(null, Validators.required),
          description: new FormControl(null, Validators.required),
          subtasks: new FormArray([
            new FormControl(null, Validators.required),
            new FormControl(null, Validators.required),
          ]),
          column: new FormControl(this.selectedColumn, Validators.required),
        });
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

  onSubmit() {
    console.log(this.taskForm);
  }
}
