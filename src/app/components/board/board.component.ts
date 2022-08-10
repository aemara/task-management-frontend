import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  columns!: any[];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getColumns(1).subscribe((columns) => {
      this.columns = columns;
    });

  }

}
