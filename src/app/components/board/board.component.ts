import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boardId!: number;
  board!: any;
  columns!: any[];
  isFetching: boolean =  false;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    /**If user is requesting a specifc board */
    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];
      if (this.boardId) {
        this.httpService.getBoard(this.boardId).subscribe((board) => {
          this.board = board;
          this.boardId = this.board._id;
          this.uiService.emitChange(this.board.title);
        });

        this.isFetching = true;
        this.httpService.getColumns(this.boardId).subscribe((data) => {
          this.columns = data.columns;
          this.isFetching = false;
        });
      } else {
        /**Else fetch the last added board on initial app load */
        this.httpService.getBoard(-1).subscribe((data) => {
          this.board = data.board[0];
          this.boardId = this.board._id;
          /**Change board name in the titlebar */
          this.uiService.emitChange(this.board.title);
          this.isFetching = true;
          this.httpService.getColumns(this.boardId).subscribe((data) => {
            this.columns = data.columns;
            this.isFetching = false;  
          });
        });
          
      }
    });
  }
}
