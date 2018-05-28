import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { AuthServices } from '../_shared/auth.service';
import { environment } from '../../environments/environment.prod';
import { Tasks } from '../_models/tasks.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public serverAdress = `${environment.serverUrl}/tasks`;

  constructor(private http: Http, private auth: AuthServices) {}

  returnHeaders(type: string) {
      let headers;
      if (type === 'auth') {
          headers = new Headers({
              'Content-Type': 'application/json',
              'Authorization': this.auth.token
          });
      } else {
          headers = new Headers({'Content-Type': 'application/json'});
      }
      const options = new RequestOptions({ headers: headers });
      return options;
  }

  getListOfTasks(projectId: string, iterationId): Observable<Tasks[]> {
    const options = this.returnHeaders('auth');
    return this.http.get(this.serverAdress + '/' + projectId + '&' + iterationId, options)
      .pipe(
        map((tasksResult: Response) => {
          return tasksResult.json().task;
        })
      );
  }

  addTask(
      task: string,
      description: string,
      status: string,
      points: string,
      userId: string,
      projectId: string,
      iterationId: string
  ): Observable<string> {
      const options = this.returnHeaders('auth');
      const taskObj = {
          task: task,
          describe: description,
          status: status,
          points: points,
          inBacklog: false,
          idUser: userId,
          idProject: projectId,
          idIteration: iterationId
      };
      return this.http.post(
              this.serverAdress + '/addTask',
              JSON.stringify(taskObj),
              options
          ).pipe(
            map((response: Response) => {
              console.log(response.json());
              return response.json();
            })
          );
  }

  deleteTask(taskId: string) {
    const options = this.returnHeaders('auth');
    return this.http.delete(this.serverAdress + '/delete/' + taskId, options)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

  editTask(taskId: string, task: object) {
    const options = this.returnHeaders('auth');
    return this.http.patch(this.serverAdress + '/update/' + taskId,
      JSON.stringify(task), options)
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }
}
