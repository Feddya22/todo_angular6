import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestOptions, Http, Headers, Response } from '@angular/http';
import { AuthServices } from '../_shared/auth.service';
import { Observable, of } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { Projects } from '../_models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public serverUrl = `${environment.serverUrl}/projects`;

  constructor(private http: Http, private authService: AuthServices) {}

  returnHeaders(type: string) {
    let headers;
    if (type === 'auth') {
        headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': this.authService.token
        });
    } else {
      headers = new Headers({'Content-Type': 'application/json'});
    }
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  getProjects(userId: string): Observable<Projects[]> {
      const options = this.returnHeaders('auth');
      return this.http.post(this.serverUrl, JSON.stringify({idUser: userId}), options)
        .pipe(
          map((projectsResult: Response) => {
            return projectsResult.json().projects;
          })
        );
  }

  addProject(userId: string, nameProject: string) {
      const options = this.returnHeaders('auth');
      const project = {
          name: nameProject,
          idUser: userId
      };
      return this.http.post(this.serverUrl + '/addProject', JSON.stringify(project), options)
        .pipe(
          map((projectResponse: any) => {
            return projectResponse.json();
          })
        );
  }

  deleteProject(projectId: string, userId: string) {
    const options = this.returnHeaders('auth');
    return this.http.delete(this.serverUrl + '/' + projectId + '&' + userId, options)
    .pipe(
      map((deletedProject: any) => {
        return deletedProject.json();
      })
    );
  }
}
