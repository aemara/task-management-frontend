import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-management-frontend';
  showBoardsModal: Boolean = false;

  onToggleBoardsModal() {
    if(this.showBoardsModal) {
      this.showBoardsModal = false;
    } else {
      this.showBoardsModal = true;
    }
  }
}
