import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css'],
})
export class SubtaskComponent implements OnInit {
  @Input() subtask!: { title: string; isDone: boolean };
  @Output() toggleDone: EventEmitter<any> = new EventEmitter();
  isDone: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isDone = this.subtask.isDone;
  }

  onClick() {
    if (this.isDone === false) {
      this.isDone = true;
      this.toggleDone.emit('true');
    } else {
      this.isDone = false;
      this.toggleDone.emit('false');
    }
  }
}
