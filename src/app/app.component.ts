import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-management-frontend';
  showBoardsModal: Boolean = false;
  showDeleteModal: Boolean = false;
  deleteModalType!: string;

  onToggleBoardsModal() {
    if(this.showBoardsModal) {
      this.showBoardsModal = false;
    } else {
      this.showBoardsModal = true;
    }
  }

  onToggleDeleteModal(event?: any) {
    this.deleteModalType = event;
    if(this.showDeleteModal) {
      this.showDeleteModal = false;
    } else {
      this.showDeleteModal = true;
    }
  }
}
