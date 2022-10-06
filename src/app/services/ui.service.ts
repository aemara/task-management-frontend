import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  isSidebarShown: boolean = false;
  constructor() {}

  private fetchingStateSubject = new ReplaySubject<any>(1);
  fetchingState$ = this.fetchingStateSubject.asObservable();
  emitFetchingState(state: any) {
    this.fetchingStateSubject.next(state);
  }

  private noColumnsSubject = new Subject<any>();
  noColumnsState$ = this.noColumnsSubject.asObservable();
  emitNoColumnsState(state: any) {
    this.noColumnsSubject.next(state);
  }

  private sidebarDisplaySubject = new Subject<any>();
  toggleEmitted$ = this.sidebarDisplaySubject.asObservable();
  emitToggle(change: any) {
    this.sidebarDisplaySubject.next(change);
    this.isSidebarShown = change;
  }

  private taskDisplaySubject = new ReplaySubject<any>(1);
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
