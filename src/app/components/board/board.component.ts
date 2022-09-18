import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Output() showAddColumn = new EventEmitter<any>();
  boardId!: string;
  board!: any;
  columns: any[] = [];
  isFetching: boolean = false;
  areThereBoards!: boolean;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    /**If user is requesting a specifc board */
    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];
      this.isFetching = true;
      if (this.boardId) {
        this.areThereBoards = true;
        this.httpService.getBoard(this.boardId).subscribe((data) => {
          this.board = data.board;
          this.columns = this.board.columns;
          this.uiService.emitChange(this.board);
          this.isFetching = false;
        });
      } else {
        /**Else fetch the last added board on initial app load */
        this.isFetching = true;
        this.httpService.getBoard('-1').subscribe((data) => {
          if (data) {
            this.board = data.board[0];
            if (this?.board) {
              this.areThereBoards = true;
              this.columns = this.board.columns;
              this.uiService.emitChange(this.board);
            } else {
              /**If there are no boards */
              this.areThereBoards = false;
            }
          }
          this.isFetching = false;
        });
      }
    });
  }

  onClickAddColumn() {
    this.uiService.showAddColumn('');
  }

  onClickAddBoard() {
    this.uiService.showAddBoard('');
  }
}
