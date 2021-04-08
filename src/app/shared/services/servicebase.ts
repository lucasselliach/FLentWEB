import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

export abstract class ServiceBase {

    protected UrlServiceV1: string = "https://localhost:44390/";

    constructor() {}

    protected extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

    protected serviceError(response: Response | any) {
        let errMsg: string;
        
        if (response instanceof Response) {            
            
            if(response.status === 0){
                errMsg = `Erro não identificado. Provalmente servidor esta offline.`;
                return Observable.throw(errMsg);
            }
            
            if(response.status === 400){
                errMsg = response.text();
                console.error(errMsg);
                return Observable.throw(`${response.status} ${response.statusText || ''} - ${errMsg}`);
            }

            if(response.status === 401){
                errMsg = `Você não está autorizado a realizar este procedimento.`;
                console.error(errMsg);
                return Observable.throw(errMsg);
            }

            errMsg = `${response.status} ${response.statusText || ''}`;

            console.error(errMsg);
            return Observable.throw(errMsg);
        } else {
            errMsg = response.message ? response.message : response.toString();
            console.error(errMsg);
            return Observable.throw(errMsg);
        }
    }
}