import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-boards-modal',
  templateUrl: './boards-modal.component.html',
  styleUrls: ['./boards-modal.component.css'],
})
export class BoardsModalComponent implements OnInit {
  @Output() showAddEditBoard = new EventEmitter<any>();
  @Output() hideModalEvent = new EventEmitter<any>();
  @ViewChildren('boardItem') boardsList!: QueryList<'boardItem'>;
  boards!: any[];
  numOfBoards!: any[];

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.http.getBoards().subscribe((data) => {
      this.boards = data.boards;
      this.numOfBoards = data.boards.length;
    });
  }

  hideModal() {
    this.hideModalEvent.emit();
  }

  ngAfterViewInit() {
    this.boardsList.changes.subscribe((li) => {
      if (this.router.url === '/') {
        li.last.nativeElement.classList.add('active-link');
      }
    });
  }

  onClickAddBoard() {
    this.showAddEditBoard.emit('add');
  }
}
