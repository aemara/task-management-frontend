import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  addColumn(data: any, boardId: string) {
    return this.http.post<any>(
      `http://localhost:3000/addcolumn/${boardId}`,
      data
    );
  }

  getBoards() {
    return this.http.get<any>('http://localhost:3000/boards');
  }

  getBoard(boardId: number) {
    return this.http.get<any>(`http://localhost:3000/board/${boardId}`);
  }

  getColumns(boardId: number) {
    return this.http.get<any>(`http://localhost:3000/columns/${boardId}`);
  }

  getTasks(columnId: number) {
    return this.http.get<any>(`http://localhost:3000/tasks/${columnId}`);
  }

  getTask(taskId: number) {
    return this.http.get<any>(`http:localhost:3000/task/${taskId}`);
  }

  getSubtasks(taskId: number) {
    return this.http.get<any>(`http://localhost:3000/subtasks/${taskId}`);
  }
}
