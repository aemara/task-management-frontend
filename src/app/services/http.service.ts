import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  addBoard(data: any) {
    return this.http.post<any>(`https://frello-server.onrender.com/boards/addboard`, data);
  }

  addColumn(data: any, boardId: string) {
    return this.http.post<any>(
      `https://frello-server.onrender.com/columns/addcolumn/${boardId}`,
      data
    );
  }

  addTask(data: any, columnId: string) {
    return this.http.post<any>(
      `https://frello-server.onrender.com/tasks/addtask/${columnId}`,
      data
    );
  }

  getBoards() {
    return this.http.get<any>('https://frello-server.onrender.com/boards/getboards');
  }

  getBoard(boardId: string) {
    return this.http.get<any>(
      `https://frello-server.onrender.com/boards/getboard/${boardId}`
    );
  }

  getColumns(boardId: string) {
    return this.http.get<any>(
      `https://frello-server.onrender.com/columns/getcolumns/${boardId}`
    );
  }

  getColumn(columnId: string) {
    return this.http.get<any>(
      `https://frello-server.onrender.com/columns/getcolumn/${columnId}`
    );
  }

  getTasks(columnId: number) {
    return this.http.get<any>(
      `https://frello-server.onrender.com/tasks/gettasks/${columnId}`
    );
  }

  getTask(taskId: string) {
    return this.http.get<any>(`https://frello-server.onrender.com/tasks/gettask/${taskId}`);
  }

  getSubtasks(taskId: string) {
    return this.http.get<any>(`https://frello-server.onrender.com/subtasks/getsubtasks/${taskId}`);
  }

  editBoard(boardId: string, data: any) {
    return this.http.put<any>(
      `https://frello-server.onrender.com/boards/updateboard/${boardId}`,
      data
    );
  }

  toggleSubtaskStatus(subtaskId: string, taskId: string) {
    return this.http.put(
      `https://frello-server.onrender.com/subtasks/toggledone/${subtaskId}/${taskId}`,
      {}
    );
  }

  changeColumn(taskId: string, currentColumnId: string, newColumnId: string) {
    return this.http.put(
      `https://frello-server.onrender.com/tasks/changecolumn/${taskId}/${currentColumnId}/${newColumnId}`,
      {}
    );
  }

  editTask(taskId: string, data: any) {
    return this.http.put(
      `https://frello-server.onrender.com/tasks/updatetask/${taskId}`,
      data
    );
  }

  deleteBoard(boardId: string) {
    return this.http.delete(
      `https://frello-server.onrender.com/boards/deleteboard/${boardId}`
    );
  }

  deleteTask(taskId: string) {
    return this.http.delete(`https://frello-server.onrender.com/tasks/deletetask/${taskId}`);
  }
}
