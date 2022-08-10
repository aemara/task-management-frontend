import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() column: any;
  columnName!: string;
  columnId!: number;
  tasks!: any[];
  numOfTasks!: number;
  
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.columnName = this.column.title;
    this.columnId = this.column.id;
    this.http.getTasks(this.columnId).subscribe((tasks) => {
      this.tasks = tasks;
      this.numOfTasks = tasks.length;
    })
  }

}
