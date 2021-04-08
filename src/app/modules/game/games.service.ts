import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { GamesModel } from "./games.model"
import { GamesCreateModel } from "./games.model"
import { GamesEditModel } from "./games.model"

import { UsuarioLogadoService } from '../../shared/services/usuariologado.service';
import { ServiceBase } from '../../shared/services/servicebase';


@Injectable()
export class GamesService extends ServiceBase {
  public endPoint: string = "game";

  constructor(private http: Http, private usuarioLogadoService: UsuarioLogadoService) {
    super();
  }

  getGames() : Observable<GamesModel> {
    let options = this.usuarioLogadoService.getAuthHeader();

    return this.http.get(this.UrlServiceV1 + this.endPoint, options)
      .map((res: Response) => <GamesModel>res.json())
      .catch(super.serviceError);
  }
  
  getGame(gameid: string) : Observable<GamesModel> {
    let options = this.usuarioLogadoService.getAuthHeader();

    return this.http.get(this.UrlServiceV1 + this.endPoint + "/" + gameid, options)
      .map((res: Response) => <GamesModel>res.json())
      .catch(super.serviceError);
  }

  postGame(gamesCreateModel: GamesCreateModel) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();

    var body = '{' + 
                 '"name":"' + gamesCreateModel.name + '"' +
                '}';

    let response = this.http.post(this.UrlServiceV1 + this.endPoint, body, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }

  putGame(gamesEditModel: GamesEditModel) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();

    var body = '{' + 
                 '"name":"' + gamesEditModel.name + '"' +
                '}';

    let response = this.http.put(this.UrlServiceV1 + this.endPoint + "/" + gamesEditModel.id, body, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }

  deleteGame(gameid: string) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();

    let response = this.http.delete(this.UrlServiceV1 + this.endPoint + "/" + gameid, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }
}