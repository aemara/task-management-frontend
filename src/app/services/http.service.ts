import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getBoards() {
    return this.http.get<any>('http://localhost:3000/boards');
  }

  getBoard(boardId: number) {
    return this.http.get<any>(`http://localhost:3000/boards/${boardId}`);
  }

  getColumns(boardId: number) {
    return this.http.get<any>(`http://localhost:3000/columns?boardId=${boardId}`);
  }

  getTasks(columnId: number) {
    return this.http.get<any>(`http://localhost:3000/tasks?columnId=${columnId}`);
  }

  getSubtasks(taskId: number) {
    return this.http.get<any>(`http://localhost:3000/subtasks?taskId=${taskId}`);
  }
}
