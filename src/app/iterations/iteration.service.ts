import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { AuthServices } from '../_shared/auth.service';
import { map } from 'rxjs/operators';
import { Iterations } from '../_models/iterations.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  public serverUrl = `${environment.serverUrl}/iterations`;

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

    getIterations(projectId: string): Observable<Iterations[]> {
      const options = this.returnHeaders('auth');
      return this.http.get(this.serverUrl + '/' + projectId, options)
        .pipe(
          map((listOfIter: Response) => {
            return listOfIter.json().iterations;
          })
        );
    }

    addIteration(iteration: object) {
      const options = this.returnHeaders('auth');
      return this.http.post(this.serverUrl + '/', JSON.stringify(iteration), options)
        .pipe(
          map((iterationResponse: Response) => {
            return iterationResponse.json();
          })
        );
    }

    updateIteration(name: string, iterationId: string) {
      const options = this.returnHeaders('auth');
      const iteration = {
          name: name
      };
      return this.http.patch(this.serverUrl + '/' + iterationId, JSON.stringify(iteration), options)
        .pipe(
          map((updateIterRes: Response) => {
            return updateIterRes.json();
          })
        );
    }
}
