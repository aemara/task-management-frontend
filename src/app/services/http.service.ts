import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  addBoard(data: any) {
    return this.http.post<any>(`http://localhost:3000/addboard`, data);
  }

  addColumn(data: any, boardId: string) {
    return this.http.post<any>(
      `http://localhost:3000/addcolumn/${boardId}`,
      data
    );
  }

  addTask(data: any, columnId: string) {
    return this.http.post<any>(
      `http://localhost:3000/addtask/${columnId}`,
      data
    );
  }

  getBoards() {
    return this.http.get<any>('http://localhost:3000/boards');
  }

  getBoard(boardId: string) {
    return this.http.get<any>(`http://localhost:3000/board/${boardId}`);
  }

  getColumns(boardId: string) {
    return this.http.get<any>(`http://localhost:3000/columns/${boardId}`);
  }

  getColumn(columnId: string) {
    return this.http.get<any>(`http://localhost:3000/column/${columnId}`);
  }

  getTasks(columnId: number) {
    return this.http.get<any>(`http://localhost:3000/tasks/${columnId}`);
  }

  getTask(taskId: string) {
    return this.http.get<any>(`http://localhost:3000/task/${taskId}`);
  }

  getSubtasks(taskId: string) {
    return this.http.get<any>(`http://localhost:3000/subtasks/${taskId}`);
  }

  toggleSubtaskStatus(subtaskId: string) {
    return this.http.put(`http://localhost:3000/toggledone/${subtaskId}`, {});
  }

  changeColumn(taskId: string, currentColumnId: string, newColumnId: string) {
    return this.http.put(
      `http://localhost:3000/changecolumn/${taskId}/${currentColumnId}/${newColumnId}`,
      {}
    );
  }

  editTask(taskId: string, data: any) {
    return this.http.put(`http://localhost:3000/edittask/${taskId}`, data);
  }

  deleteBoard(boardId: string) {
    return this.http.delete(`http://localhost:3000/removeboard/${boardId}`);
  }
}
