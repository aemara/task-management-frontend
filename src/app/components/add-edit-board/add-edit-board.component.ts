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
  path!: string;
  boardForm!: FormGroup;
  boardId!: string;
  currentBoardTitle!: string;
  boardColumns!: any[];
  columnsToBeDeleted: string[] = [];
  isFetching!: boolean;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.boardId = this.uiService.boardId;
    if (this.addOrEditBoard === 'add') {
      this.boardForm = new FormGroup({
        boardName: new FormControl(null, Validators.required),
        boardColumns: new FormArray([
          new FormGroup({
            columnName: new FormControl(null, Validators.required),
            columnId: new FormControl(null),
          }),
          new FormGroup({
            columnName: new FormControl(null, Validators.required),
            columnId: new FormControl(null),
          }),
        ]),
      });
    } else {
      this.isFetching = true;
      this.httpService.getColumns(this.boardId).subscribe((data) => {
        this.currentBoardTitle = data.boardTitle;
        const columnsFormGroups: any = [];
        data.columns.forEach((column: any) => {
          const formControl = new FormGroup({
            columnName: new FormControl(column.title, Validators.required),
            columnId: new FormControl(column._id),
          });
          columnsFormGroups.push(formControl);
        });
        this.boardForm = new FormGroup({
          boardName: new FormControl(data.boardTitle, Validators.required),
          boardColumns: new FormArray(columnsFormGroups),
        });
        this.isFetching = false;
      });
    }
  }

  onAddBoardColumn() {
    const formGroup = new FormGroup({
      columnName: new FormControl(null, Validators.required),
      columnId: new FormControl(null),
    });
    (<FormArray>this.boardForm.get('boardColumns')).push(formGroup);
  }

  getBoardColumnsControls() {
    return (<FormArray>this.boardForm.get('boardColumns')).controls;
  }

  onDeleteBoardColumn(index: number) {
    this.columnsToBeDeleted.push(
      (<FormArray>this.boardForm.get('boardColumns')).at(index).value.columnId
    );
    console.log(this.columnsToBeDeleted);
    (<FormArray>this.boardForm.get('boardColumns')).removeAt(index);
  }

  onHideAddEditBoard(event: any) {
    if (event.target.className === 'add-edit-board-modal') {
      this.hideAddEditBoard.emit();
    }
  }

  onSubmit() {
    if (this.addOrEditBoard === 'add') {
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
      this.isFetching = true;
      this.httpService.addBoard(board).subscribe((response) => {
        this.isFetching = false;
        this.hideAddEditBoard.emit();
        this.router.navigate(['/board', response.boardId]);
      });
    } else {
      const data: any = {};

      /**If there is a new board title */
      if (this.boardForm.value.boardName !== this.currentBoardTitle) {
        console.log(this.boardForm.value.boardName);
        data['title'] = this.boardForm.value.boardName;
      }

      data['columns'] = this.boardForm.value.boardColumns;
      data['deletedColumns'] = this.columnsToBeDeleted;

      this.isFetching = true;
      this.httpService.editBoard(this.boardId, data).subscribe(() => {
        this.isFetching = false;
        this.hideAddEditBoard.emit();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      });
    }
  }
}
