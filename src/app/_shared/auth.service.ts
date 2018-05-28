import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, filter, scan, catchError } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/edge';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthServices {
    public token: string;
    public userId: string;
    public addres = `${environment.serverUrl}/users`;

    constructor(private http: Http) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.userId = currentUser && currentUser.userId;
    }

    returnHeaders(type: string) {
        let headers;
        if (type === 'auth') {
            headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.token
            });
        } else {
            headers = new Headers({'Content-Type': 'application/json'});
        }
        const options = new RequestOptions({ headers: headers });
        return options;
    }

    login(email: string, password: string): Observable<boolean> {
        const options = this.returnHeaders('noauth');
        return this.http.post(
            this.addres + '/checkUser',
            JSON.stringify({email: email, password: password}),
            options).pipe(
                map((res: Response) => {
                    const recivedToken = res.json() && res.json().token;
                    if (recivedToken) {
                        this.token = recivedToken;
                        localStorage.setItem('currentUser', JSON.stringify({
                            email: email,
                            userId: res.json().userId,
                            token: recivedToken
                        }));
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    registration(email: string, name: string, password: string): Observable<boolean> {
        const options = this.returnHeaders('noauth');
        const user = {
            name: name,
            email: email,
            password: password
        };
        return this.http.post(this.addres + '/addUser', JSON.stringify(user), options)
            .pipe(
                map((res: Response) => {
                    const isRegistred = res.json() && res.json().added;
                    if (isRegistred) {
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
