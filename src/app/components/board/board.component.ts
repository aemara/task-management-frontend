import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getBoards().subscribe((boards) => {
      console.log(boards);
    });

    this.httpService.getColumns(1).subscribe((columns) => {
      console.log(columns);
    })

    this.httpService.getTasks(22).subscribe((tasks) => {
      console.log(tasks);
    })

    this.httpService.getSubtasks(444).subscribe((subtasks) => {
      console.log(subtasks);
    })
  }

}
