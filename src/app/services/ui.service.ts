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
}
