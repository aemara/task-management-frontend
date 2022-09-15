import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-add-edit-board',
  templateUrl: './add-edit-board.component.html',
  styleUrls: ['./add-edit-board.component.css'],
})
export class AddEditBoardComponent implements OnInit {
  @Output() hideAddEditBoard = new EventEmitter<any>();
  @Input() addOrEditBoard!: string;
  isAdd: boolean = true;
  path!: string;
  boardForm!: FormGroup;
  boardId!: string;
  boardName!: string;
  boardColumns!: any[];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    if (this.addOrEditBoard === 'add') {
      this.boardForm = new FormGroup({
        boardName: new FormControl(null, Validators.required),
        boardColumns: new FormArray([
          new FormControl(null, Validators.required),
          new FormControl(null, Validators.required),
        ]),
      });
    }
  }

  onAddBoardColumn() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.boardForm.get('boardColumns')).push(control);
  }

  getBoardColumnsControls() {
    return (<FormArray>this.boardForm.get('boardColumns')).controls;
  }

  onDeleteBoardColumn(index: number) {
    (<FormArray>this.boardForm.get('boardColumns')).removeAt(index);
  }

  onHideAddEditBoard(event: any) {
    if (event.target.className === 'add-edit-board-modal') {
      this.hideAddEditBoard.emit();
    }
  }

  onSubmit() {
    const columns: any = [];
    if (this.boardForm.value.boardColumns.length > 0) {
      this.boardForm.value.boardColumns.forEach((title: any) => {
        const column = { title: title };
        columns.push(column);
      });
    }

    const board = {
      title: this.boardForm.value.boardName,
      columns: columns,
    };

    this.httpService.addBoard(board).subscribe((response) => {
      this.hideAddEditBoard.emit();
      this.router.navigate(['/board', response.boardId]);
    })
  }
}
