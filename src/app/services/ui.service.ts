import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  boardName!: string;
  boardId!: string;
  isSidebarShown: boolean = false;
  constructor() {}

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
    this.emitChangeSource.next(change);
    this.boardName = change.title;
    this.boardId = change._id;
  }

  private sidebarDisplaySubject = new Subject<any>();
  toggleEmitted$ = this.sidebarDisplaySubject.asObservable();
  emitToggle(change: any) {
    this.sidebarDisplaySubject.next(change);
    this.isSidebarShown = change;
  }

  private taskDisplaySubject = new ReplaySubject<any>();
  taskDisplay$ = this.taskDisplaySubject.asObservable();
  showTask(taskData: any) {
    this.taskDisplaySubject.next(taskData);
  }

  private addColumnDisplaySubject = new ReplaySubject<any>();
  addColumnDisplay$ = this.addColumnDisplaySubject.asObservable();
  showAddColumn(change: any) {
    this.addColumnDisplaySubject.next(change);
  }

  private showAddBoardSubject = new ReplaySubject<any>();
  addBoardDisplay$ = this.showAddBoardSubject.asObservable();
  showAddBoard(change: any) {
    this.showAddBoardSubject.next(change);
  }

  private showDeleteModalSubject = new ReplaySubject<any>();
  deleteModalDisplay$ = this.showDeleteModalSubject.asObservable();
  showDeleteModal(type: any, id: any) {
    const data = { type: type, id: id };
    this.showDeleteModalSubject.next(data);
  }

  private fetchBoardsSubject = new Subject<any>();
  fetchBoards$ = this.fetchBoardsSubject.asObservable();
  fetchBoards(change: any) {
    this.fetchBoardsSubject.next(change);
  }
}
