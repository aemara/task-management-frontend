import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-edit-board',
  templateUrl: './add-edit-board.component.html',
  styleUrls: ['./add-edit-board.component.css']
})
export class AddEditBoardComponent implements OnInit {

  boardForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.boardForm = new FormGroup({
      'boardName': new FormControl(null, Validators.required),
      'boardColumns': new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required)
      ]),
    });
  }

  onAddBoardColumn() {
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.boardForm.get('boardColumns')).push(control);
  }

  getBoardColumnsControls() {
    return (<FormArray> this.boardForm.get('boardColumns')).controls
  }

  onDeleteBoardColumn(index: number) {
    (<FormArray>this.boardForm.get('boardColumns')).removeAt(index);
  }

  onSubmit() {
    console.log(this.boardForm);
  }
 
}
