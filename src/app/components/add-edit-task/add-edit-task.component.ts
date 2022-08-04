import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {

  taskForm!: FormGroup;
  listOfColumns!: any[];

  constructor() { 
    this.listOfColumns = [
      {
        name: 'Todo'
      },
      {
        name: 'Doing'
      },
      {
        name: 'Hello'
      }
    ];
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'subtasks': new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required)
      ]),
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

  onSubmit() {
    console.log(this.taskForm);
  }

}
