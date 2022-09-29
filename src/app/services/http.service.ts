import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  addBoard(data: any) {
    return this.http.post<any>(`http://localhost:3000/boards/addboard`, data);
  }

  addColumn(data: any, boardId: string) {
    return this.http.post<any>(
      `http://localhost:3000/columns/addcolumn/${boardId}`,
      data
    );
  }

  addTask(data: any, columnId: string) {
    return this.http.post<any>(
      `http://localhost:3000/tasks/addtask/${columnId}`,
      data
    );
  }

  getBoards() {
    return this.http.get<any>('http://localhost:3000/boards/getboards');
  }

  getBoard(boardId: string) {
    return this.http.get<any>(
      `http://localhost:3000/boards/getboard/${boardId}`
    );
  }

  getColumns(boardId: string) {
    return this.http.get<any>(
      `http://localhost:3000/columns/getcolumns/${boardId}`
    );
  }

  getColumn(columnId: string) {
    return this.http.get<any>(
      `http://localhost:3000/columns/getcolumn/${columnId}`
    );
  }

  getTasks(columnId: number) {
    return this.http.get<any>(
      `http://localhost:3000/tasks/gettasks/${columnId}`
    );
  }

  getTask(taskId: string) {
    return this.http.get<any>(`http://localhost:3000/tasks/gettask/${taskId}`);
  }

  getSubtasks(taskId: string) {
    return this.http.get<any>(`http://localhost:3000/subtasks/getsubtasks/${taskId}`);
  }

  editBoard(boardId: string, data: any) {
    return this.http.put<any>(
      `http://localhost:3000/boards/updateboard/${boardId}`,
      data
    );
  }

  toggleSubtaskStatus(subtaskId: string, taskId: string) {
    return this.http.put(
      `http://localhost:3000/subtasks/toggledone/${subtaskId}/${taskId}`,
      {}
    );
  }

  changeColumn(taskId: string, currentColumnId: string, newColumnId: string) {
    return this.http.put(
      `http://localhost:3000/tasks/changecolumn/${taskId}/${currentColumnId}/${newColumnId}`,
      {}
    );
  }

  editTask(taskId: string, data: any) {
    return this.http.put(
      `http://localhost:3000/tasks/updatetask/${taskId}`,
      data
    );
  }

  deleteBoard(boardId: string) {
    return this.http.delete(
      `http://localhost:3000/boards/deleteboard/${boardId}`
    );
  }

  deleteTask(taskId: string) {
    return this.http.delete(`http://localhost:3000/tasks/deletetask/${taskId}`);
  }
}
