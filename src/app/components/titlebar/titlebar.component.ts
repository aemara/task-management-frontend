import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  @Output() showBoardsModal  = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowBoardsModal() {
    this.showBoardsModal.emit();
  }

}
