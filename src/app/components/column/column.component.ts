import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() column: any;
  columnName!: string;
  columnId!: number;
  tasks!: any[];
  numOfTasks!: number;

  constructor(private http: HttpService, private uiService: UiService) {}

  ngOnInit(): void {
    this.columnName = this.column.title;
    this.columnId = this.column._id;
    this.tasks = this.column.tasks;
    this.numOfTasks = this.tasks.length;
  }

  onTaskClick(taskObject: any, columnName: string) {
    const data = {
      task: taskObject,
      columnName: columnName
    }
    this.uiService.showTask(data);
  }
}
