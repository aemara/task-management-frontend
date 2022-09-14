import { Component, Output } from '@angular/core';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-management-frontend';
  @Output() showBoardsModal: boolean = false;
  showDeleteModal: Boolean = false;
  deleteModalType!: string;
  showSidebar = false;
  showTask = false;
  showAddEditTask = false;
  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.toggleEmitted$.subscribe((isShown) => {
      this.showSidebar = isShown;
    });

    this.uiService.taskDisplay$.subscribe(() => {
      this.showTask = true;
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

  displayAddEditTask() {
    this.showAddEditTask = true;
  }

  hideAddEditTask() {
    this.showAddEditTask = false;
  }
}
