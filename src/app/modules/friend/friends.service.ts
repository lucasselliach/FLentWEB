import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { FriendsModel } from "./friends.model"
import { FriendModel } from "./friends.model"
import { FriendsCreateModel } from "./friends.model"
import { FriendsEditModel } from "./friends.model"

import { UsuarioLogadoService } from '../../shared/services/usuariologado.service';
import { ServiceBase } from '../../shared/services/servicebase';


@Injectable()
export class FriendsService extends ServiceBase {
  public endPoint: string = "friend";

  constructor(private http: Http, private usuarioLogadoService: UsuarioLogadoService) {
    super();
  }
  
  getFriends() : Observable<FriendsModel> {
    let options = this.usuarioLogadoService.getAuthHeader();

    return this.http.get(this.UrlServiceV1 + this.endPoint, options)
      .map((res: Response) => <FriendsModel>res.json())
      .catch(super.serviceError);
  }
  
  getFriend(friendid: string) : Observable<FriendModel> {
    let options = this.usuarioLogadoService.getAuthHeader();

    return this.http.get(this.UrlServiceV1 + this.endPoint + "/" + friendid, options)
      .map((res: Response) => <FriendModel>res.json())
      .catch(super.serviceError);
  }

  postFriend(friendsCreateModel: FriendsCreateModel) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();
                
    var body = '{' + 
                  '"name":"' + friendsCreateModel.name + '",' +
                  '"NickName":"' + friendsCreateModel.nickName + '",' +
                  '"Email":"' + friendsCreateModel.email + '",' +
                  '"Phone":"' + friendsCreateModel.phoneNumber01 + '"' +
                '}';

    let response = this.http.post(this.UrlServiceV1 + this.endPoint, body, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }

  putFriend(friendsEditModel: FriendsEditModel) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();

    var body = '{' + 
                  '"name":"' + friendsEditModel.name + '",' +
                  '"NickName":"' + friendsEditModel.nickName + '",' +
                  '"Email":"' + friendsEditModel.email + '",' +
                  '"Phone":"' + friendsEditModel.phoneNumber01 + '"' +
                '}';

    let response = this.http.put(this.UrlServiceV1 + this.endPoint + "/" + friendsEditModel.id, body, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }

  deleteFriend(friendid: string) : Observable<string> {
    let options = this.usuarioLogadoService.getAuthHeader();

    let response = this.http.delete(this.UrlServiceV1 + this.endPoint + "/" + friendid, options)
                            .map(this.extractData)
                            .catch((super.serviceError));
        
    return response;
  }
}