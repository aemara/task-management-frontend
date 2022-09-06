import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  boardName!: string;
  boardId!: string;
  isSidebarShown: boolean = false;
  constructor() { }
  
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
      this.emitChangeSource.next(change);
      this.boardName = change.title;
      this.boardId = change._id;
  }


  private sidebarDisplay = new Subject<any>();
  toggleEmitted$ = this.sidebarDisplay.asObservable();
  emitToggle(change: any) {
      this.sidebarDisplay.next(change);
      this.isSidebarShown = change;
  }


}
