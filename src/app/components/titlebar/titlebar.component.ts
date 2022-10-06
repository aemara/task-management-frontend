import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css'],
})
export class TitlebarComponent implements OnInit {
  @Output() showBoardsModal = new EventEmitter<any>();
  @Output() showDeleteModal = new EventEmitter<any>();
  @Output() showSidebar = new EventEmitter<any>();
  @Output() showAddEditTask = new EventEmitter<any>();
  @Output() showAddEditBoard = new EventEmitter<any>();
  @Input() displayBoardsModal!: boolean;
  boardName!: string;
  boardId!: string;
  showOptions: boolean = false;
  isSidebarShown!: boolean;
  disableAddTask: boolean = false;
  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.isSidebarShown = this.uiService.isSidebarShown;
    this.uiService.fetchingState$.subscribe((state) => {
      if (!state) {
        this.boardName = '';
        this.disableAddTask = true;
      } else {
        this.boardName = state.title;
        this.boardId = state.boardId;
      }
    });

    this.uiService.noColumnsState$.subscribe(state => {
      if(state) {
        this.disableAddTask = true;
      } else {
        this.disableAddTask = false;
      }
    })
    this.uiService.toggleEmitted$.subscribe((isShown) => {
      this.isSidebarShown = isShown;
    });
  }

  onShowBoardsModal() {
    this.showBoardsModal.emit();
  }

  onShowDeleteModal() {
    this.uiService.showDeleteModal('board', this.boardId);
    this.toggleOptions();
  }

  toggleOptions() {
    if (this.showOptions) {
      this.showOptions = false;
    } else {
      this.showOptions = true;
    }
  }

  onClickAddTask() {
    this.showAddEditTask.emit('add');
  }

  onClickEditBoard() {
    this.showAddEditBoard.emit('edit');
  }
}
