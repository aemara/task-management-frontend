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

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];
      if (this.boardId) {
        this.httpService.getBoard(this.boardId).subscribe((board) => {
          this.board = board;
          console.log(this.board.title);
          this.uiService.emitChange(this.board.title);
        });
        this.httpService.getColumns(this.boardId).subscribe((columns) => {
          this.columns = columns;
        });
      } else {
        this.httpService.getBoard(1).subscribe((board) => {
          this.board = board;
          console.log(this.board);
          console.log(this.board.title);
          this.uiService.emitChange(this.board.title);
        });
        this.httpService.getColumns(1).subscribe((columns) => {
          this.columns = columns;
        });
      }
    });
  }
}
