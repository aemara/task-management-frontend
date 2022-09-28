import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() showAddEditBoard = new EventEmitter<any>();
  @ViewChildren('boardItem') boardsList!: QueryList<'boardItem'>;
  boards!: any[];
  numOfBoards!: any[];
  constructor(
    private http: HttpService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.getBoards().subscribe((data) => {
      this.boards = data.boards;
      this.numOfBoards = data.boards.length;
    });

    this.uiService.fetchBoards$.subscribe(() => {
      this.http.getBoards().subscribe((data) => {
        this.boards = data.boards;
        this.numOfBoards = data.boards.length;
      });
    });
  }

  ngAfterViewInit() {
    this.boardsList.changes.subscribe((li) => {
      if (this.router.url === '/') {
        li.last.nativeElement.className = 'active-link';
      }
    });
  }

  hideSidebar() {
    this.uiService.emitToggle(false);
  }

  onClickAddBoard() {
    this.showAddEditBoard.emit('add');
  }
}
