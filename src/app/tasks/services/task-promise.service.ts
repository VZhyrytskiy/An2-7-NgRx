import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TaskModel } from './../models/task.model';

@Injectable({
  providedIn: 'any'
})
export class TaskPromiseService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Promise<TaskModel[]> {
    return this.http
      .get(this.tasksUrl)
      .toPromise()
      .then(response => response as TaskModel[])
      .catch(this.handleError);
  }

  getTask(id: number): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  updateTask(task: TaskModel): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${task.id}`;
    const body = JSON.stringify(task);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  createTask(task: TaskModel): Promise<TaskModel> {
    const url = this.tasksUrl;
    const body = JSON.stringify(task);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response as TaskModel)
      .catch(this.handleError);
  }

  deleteTask(task: TaskModel): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${task.id}`;

    return (
      this.http
        .delete(url)
        .toPromise()
        // json-server return empty object
        // so we don't use .then(...)
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
