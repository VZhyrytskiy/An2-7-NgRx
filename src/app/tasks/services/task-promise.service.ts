import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { TaskModel } from './../models/task.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class TaskPromiseService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Promise<TaskModel[]> {
    const request$ = this.http.get(this.tasksUrl);
    return firstValueFrom(request$)
      .then(response => response as TaskModel[])
      .catch(this.handleError);
  }

  getTask(id: NonNullable<TaskModel['id']> | string): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;

    const request$ = this.http.get(url);
    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  updateTask(task: TaskModel): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${task.id}`;
    const request$ = this.http.put(url, task);

    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  createTask(task: TaskModel): Promise<TaskModel> {
    const url = this.tasksUrl;
    const request$ = this.http.post(url, task);

    return firstValueFrom(request$)
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  deleteTask(task: TaskModel): Promise<unknown> {
    const url = `${this.tasksUrl}/${task.id}`;
    const request$ = this.http.delete(url);

    return firstValueFrom(request$)
        // json-server return empty object
        // so we don't use .then(...)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
