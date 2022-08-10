import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boards-modal',
  templateUrl: './boards-modal.component.html',
  styleUrls: ['./boards-modal.component.css']
})
export class BoardsModalComponent implements OnInit {

  @Output() hideModalEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  hideModal() {
    this.hideModalEvent.emit();
  }

}
