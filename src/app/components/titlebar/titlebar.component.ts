import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css'],
})
export class TitlebarComponent implements OnInit {
  @Output() showBoardsModal = new EventEmitter<any>();
  @Output() showDeleteModal = new EventEmitter<any>();
  boardName!: string;
  boardId!: string;
  showOptions: boolean = false;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.changeEmitted$.subscribe((board) => {
      this.boardName = board.title;
      this.boardId = board._id;
    });
  }

  onShowBoardsModal() {
    this.showBoardsModal.emit();
  }

  onShowDeleteModal() {
    this.showDeleteModal.emit('board');
    this.toggleOptions();
  }

  toggleOptions() {
    if (this.showOptions) {
      this.showOptions = false;
    } else {
      this.showOptions = true;
    }
  }
}
