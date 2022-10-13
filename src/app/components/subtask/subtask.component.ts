import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Form } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css'],
})
export class SubtaskComponent implements OnInit {
  @Input() subtask!: any;
  @Input() taskId!: string;
  @Output() toggleDone: EventEmitter<any> = new EventEmitter();
  subtaskName!: string;
  subtaskId!: string;
  isDone: boolean = false;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.subtaskName = this.subtask.name;
    this.subtaskId = this.subtask._id;
    this.isDone = this.subtask.done;
  }

  onClick() {
    this.http.toggleSubtaskStatus(this.subtaskId, this.taskId).subscribe(() => {
      if (this.isDone === false) {
        this.isDone = true;
        this.toggleDone.emit('true');
      } else {
        this.isDone = false;
        this.toggleDone.emit('false');
      }
    });
  }
}
