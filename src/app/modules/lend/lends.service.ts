import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { LendsModel } from "./lends.model"
import { LendModel } from "./lends.model"
import { LendsCreateModel } from "./lends.model"

import { UsuarioLogadoService } from '../../shared/services/usuariologado.service';
import { ServiceBase } from '../../shared/services/servicebase';


@Injectable()
export class LendsService extends ServiceBase {
  public endPoint: string = "lend";

  constructor(private http: Http, private usuarioLogadoService: UsuarioLogadoService) {
    super();
  }
  
  getLends() : Observable<LendsModel> {
    let options = this.usuarioLogadoService.getAuthHeader();

    return this.http.get(this.UrlServiceV1 + this.endPoint, options)
      .map((res: Response) => <LendsModel>res.json())
      .catch(super.serviceError);
  }
  
  getLend(lendid: string) : Observable<LendModel> {
    let options = this.usuarioLogadoService.getAuthHeader();

    return this.http.get(this.UrlServiceV1 + this.endPoint + "/" + lendid, options)
      .map((res: Response) => <LendModel>res.json())
      .catch(super.serviceError);
  }

  postLend(lendsCreateModel: LendsCreateModel) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();
                
    var body = '{' + 
                  '"GamerId":"' + lendsCreateModel.gamerId + '",' +
                  '"FriendId":"' + lendsCreateModel.friendId + '",' +
                  '"DeadlineDate":' + lendsCreateModel.deadlineDate + '' +
                '}';

    let response = this.http.post(this.UrlServiceV1 + this.endPoint, body, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }
  
  putLendDeactive(gameId: string) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();

    var body = '{' + 
                '}';

    let response = this.http.put(this.UrlServiceV1 + this.endPoint + "/" + gameId, body, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }
}