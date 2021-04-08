import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LoginModel } from './login.model';
import { ServiceBase } from './../../../shared/services/servicebase';

@Injectable()
export class LoginService extends ServiceBase {
    constructor(private http: Http) {
        super()
    }

    postLogin(loginModel: LoginModel): Observable<LoginModel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var body = '{' + 
                    '"Login":"' + loginModel.login + '",' + 
                    '"Password":"' + loginModel.password + '"' +
                    '}';

        let response = this.http
            .post(this.UrlServiceV1 + 'user/login', body, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
    }
}