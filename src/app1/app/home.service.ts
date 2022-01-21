import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  // baseUrl = 'https://697a-111-223-31-240.ngrok.io';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = '';
    return this.http.get('http://localhost:3005/get/tasks');
    // return this.http.post(this.baseUrl + 'AdminHomePaeSection', body, { 'headers': headers })
  }

  getColumnData(): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = '';
    return this.http.get('http://localhost:3005/get/headers');
    // return this.http.post(this.`http://localhost:3005/update/task + 'AdminHomePaeSection', body, { 'headers': headers })
  }

  postRowData(data:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(data);
    return this.http.post('http://localhost:3005/add/task', data);
  }

  postSubRowData(data:any, parentTaskID:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(data);
    return this.http.post(
      'http://localhost:3005/add/subTask/' + parentTaskID,
      data
    );
  }

  updateRowData(data:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(data);
    return this.http.put(
      'http://localhost:3005/update/task/' + data["Task ID"],
      data
    );
  }

  updateSubTaskData(taskID:any, subtaskID:any, data:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(data);
    return this.http.put(
      'http://localhost:3005/update/subtask/' + taskID + '/' + subtaskID,
      data
    );
  }

  addColumn(data:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(data);
    return this.http.post('http://localhost:3005/add/headerdata', data);
  }
  editColumn(data:any, id:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(data);
    return this.http.put('http://localhost:3005/edit/headerData/' + id, data);
  }

  removeColumnData(id:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(data);
    return this.http.delete('http://localhost:3005/removeHeader/' + id);
  }

  deleteRowData(id:any): Observable<any> {
    return this.http.delete('http://localhost:3005/delete/task/' + id);
  }

  deleteSubTaskData(taskID:any, subtaskID:any): Observable<any> {
    // const body = JSON.stringify(data);
    return this.http.delete(
      'http://localhost:3005/delete/subtask/' + taskID + '/' + subtaskID
    );
  }
}
