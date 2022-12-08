import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-management-frontend';
  @Output() showBoardsModal: boolean = false;
  @Output() addOrEditTask!: string;
  @Output() addOrEditBoard!: string;
  showDeleteModal: Boolean = false;
  deleteModalType!: string;
  showSidebar = false;
  showTask = false;
  showAddEditTask = false;
  showAddEditBoard = false;
  showAddColumn = false;
  isAuthenticated: boolean = false;
  private userSub!: Subscription;
  constructor(private uiService: UiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.uiService.toggleEmitted$.subscribe((isShown) => {
      this.showSidebar = isShown;
    });

    this.uiService.taskDisplay$.subscribe(() => {
      this.showTask = true;
    });

    this.uiService.addColumnDisplay$.subscribe(() => {
      this.showAddColumn = true;
    });

    this.uiService.addBoardDisplay$.subscribe(() => {
      this.showAddEditBoard = true;
      this.addOrEditBoard = 'add';
    });

    this.uiService.deleteModalDisplay$.subscribe((data: any) => {
      this.onToggleDeleteModal(data.type);
    });

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onToggleBoardsModal() {
    if (this.showBoardsModal) {
      this.showBoardsModal = false;
    } else {
      this.showBoardsModal = true;
    }
  }

  onToggleDeleteModal(event?: any) {
    this.deleteModalType = event;
    if (this.showDeleteModal) {
      this.showDeleteModal = false;
    } else {
      this.showDeleteModal = true;
    }
  }

  displaySidebar() {
    this.uiService.emitToggle(true);
  }

  hideTaskView() {
    this.showTask = false;
  }

  displayAddEditTask(eventData: any) {
    this.showAddEditTask = true;
    if (eventData === 'add') {
      this.addOrEditTask = 'add';
    } else {
      this.addOrEditTask = 'edit';
    }
  }

  hideAddEditTask() {
    this.showAddEditTask = false;
  }

  displayAddEditBoard(eventData: any) {
    this.showAddEditBoard = true;
    if (eventData === 'add') {
      this.addOrEditBoard = 'add';
    } else {
      this.addOrEditBoard = 'edit';
    }
  }

  hideAddEditBoard() {
    this.showAddEditBoard = false;
  }

  hideAddColumn() {
    this.showAddColumn = false;
  }

  hideOptions(eventData: any) {
    if (eventData.target.className !== 'options-btn') {
      this.uiService.hideOptions(null);
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
