import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnInit {
  @Output() hideDeleteModal = new EventEmitter<any>();
  deleteModalType!: string;
  boardName!: string;
  boardId!: string;
  taskId!: string;
  constructor(
    private uiService: UiService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardName = this.uiService.boardName;
    this.boardId = this.uiService.boardId;

    this.uiService.deleteModalDisplay$.subscribe((data) => {
      this.deleteModalType = data.type;
      if (data.type === 'board') {
        this.boardId = data.id;
      } else {
        this.taskId = data.id;
      }
    });
  }

  onHideDeleteModal(event: any) {
    if (
      event.target.className === 'modal' ||
      event.target.className === 'cancel-btn'
    ) {
      this.hideDeleteModal.emit();
    }
  }

  onDelete() {
    if (this.deleteModalType === 'board') {
      this.http.deleteBoard(this.boardId).subscribe(() => {
        this.hideDeleteModal.emit();
        this.uiService.fetchBoards(null);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['']);
      });
    } else {
      this.http.deleteTask(this.taskId).subscribe(() => {
        this.hideDeleteModal.emit();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      });
    }
  }
}
