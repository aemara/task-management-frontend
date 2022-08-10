import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boardId!: number;
  boardName!: string;
  columns!: any[];

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.httpService.getColumns(1).subscribe((columns) => {
      this.columns = columns;
    });

    this.route.params.subscribe((params: Params) => {
      this.boardId = params['id'];
      this.httpService.getColumns(this.boardId).subscribe((columns) => {
        this.columns = columns;
      });
    });
  }
}
