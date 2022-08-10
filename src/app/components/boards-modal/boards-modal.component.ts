import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-boards-modal',
  templateUrl: './boards-modal.component.html',
  styleUrls: ['./boards-modal.component.css']
})
export class BoardsModalComponent implements OnInit {

  @Output() hideModalEvent = new EventEmitter<any>();
  boards!: any[];
  numOfBoards!: any[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getBoards().subscribe(boards => {
      this.boards = boards;
      this.numOfBoards = boards.length;
    })
  }

  hideModal() {
    this.hideModalEvent.emit();
  }

}
