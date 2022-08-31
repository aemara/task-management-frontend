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
  @Input() deleteModalType = '';
  boardName!: string;
  boardId!: string;
  constructor(
    private uiService: UiService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardName = this.uiService.boardName;
    this.boardId = this.uiService.boardId;
  }

  onHideDeleteModal(event: any) {
    if (
      event.target.className === 'modal' ||
      event.target.className === 'cancel-btn'
    ) {
      this.hideDeleteModal.emit();
    }
  }

  onDeleteBoard() {
    this.http.deleteBoard(this.boardId).subscribe(() => {
      this.hideDeleteModal.emit();
      this.router.navigate(['']);
    });
  }
}
