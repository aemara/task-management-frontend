import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() showAddEditBoard = new EventEmitter<any>();
  boards!: any[];
  numOfBoards!: any[];
  constructor(private http: HttpService, private uiService: UiService) {}

  ngOnInit(): void {
    this.http.getBoards().subscribe((data) => {
      this.boards = data.boards;
      this.numOfBoards = data.boards.length;
    });
  }

  hideSidebar() {
    this.uiService.emitToggle(false);
  }

  onClickAddBoard() {
    this.showAddEditBoard.emit("add");
  }
}
