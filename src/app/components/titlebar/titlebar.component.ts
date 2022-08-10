import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  @Output() showBoardsModal  = new EventEmitter<any>();
  boardName!: string;

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    this.uiService.changeEmitted$.subscribe(name => {
      this.boardName = name;
  });
  }

  onShowBoardsModal() {
    this.showBoardsModal.emit();
  }

}
