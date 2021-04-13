import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { RegisterModel } from './register.model';
import { ServiceBase } from './../../../shared/services/servicebase';

@Injectable()
export class RegisterUserService extends ServiceBase {
    constructor(private http: Http) {
        super()
    }

    postRegister(registerModel: RegisterModel): Observable<RegisterModel> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var body = '{' + 
                    '"Name":"' + registerModel.login + '",' + 
                    '"Login":"' + registerModel.login + '",' + 
                    '"Password":"' + registerModel.password + '"' +
                    '}';

        let response = this.http
            .post(this.UrlServiceV1 + 'user', body, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
    }
}