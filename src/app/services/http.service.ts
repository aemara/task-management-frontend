import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  addBoard(data: any) {
    return this.http.post<any>(`https://task-management-backend-production.up.railway.app/boards/addboard`, data);
  }

  addColumn(data: any, boardId: string) {
    return this.http.post<any>(
      `https://task-management-backend-production.up.railway.app/columns/addcolumn/${boardId}`,
      data
    );
  }

  addTask(data: any, columnId: string) {
    return this.http.post<any>(
      `https://task-management-backend-production.up.railway.app/tasks/addtask/${columnId}`,
      data
    );
  }

  getBoards() {
    return this.http.get<any>('https://task-management-backend-production.up.railway.app/boards/getboards');
  }

  getBoard(boardId: string) {
    return this.http.get<any>(
      `https://task-management-backend-production.up.railway.app/boards/getboard/${boardId}`
    );
  }

  getColumns(boardId: string) {
    return this.http.get<any>(
      `https://task-management-backend-production.up.railway.app/columns/getcolumns/${boardId}`
    );
  }

  getColumn(columnId: string) {
    return this.http.get<any>(
      `https://task-management-backend-production.up.railway.app/columns/getcolumn/${columnId}`
    );
  }

  getTasks(columnId: number) {
    return this.http.get<any>(
      `https://task-management-backend-production.up.railway.app/tasks/gettasks/${columnId}`
    );
  }

  getTask(taskId: string) {
    return this.http.get<any>(`https://task-management-backend-production.up.railway.app/tasks/gettask/${taskId}`);
  }

  getSubtasks(taskId: string) {
    return this.http.get<any>(`https://task-management-backend-production.up.railway.app/subtasks/getsubtasks/${taskId}`);
  }

  editBoard(boardId: string, data: any) {
    return this.http.put<any>(
      `https://task-management-backend-production.up.railway.app/boards/updateboard/${boardId}`,
      data
    );
  }

  toggleSubtaskStatus(subtaskId: string, taskId: string) {
    return this.http.put(
      `https://task-management-backend-production.up.railway.app/subtasks/toggledone/${subtaskId}/${taskId}`,
      {}
    );
  }

  changeColumn(taskId: string, currentColumnId: string, newColumnId: string) {
    return this.http.put(
      `https://task-management-backend-production.up.railway.app/tasks/changecolumn/${taskId}/${currentColumnId}/${newColumnId}`,
      {}
    );
  }

  editTask(taskId: string, data: any) {
    return this.http.put(
      `https://task-management-backend-production.up.railway.app/tasks/updatetask/${taskId}`,
      data
    );
  }

  deleteBoard(boardId: string) {
    return this.http.delete(
      `https://task-management-backend-production.up.railway.app/boards/deleteboard/${boardId}`
    );
  }

  deleteTask(taskId: string) {
    return this.http.delete(`https://task-management-backend-production.up.railway.app/tasks/deletetask/${taskId}`);
  }
}
