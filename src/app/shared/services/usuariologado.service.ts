import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";

import { UsuarioLogadoModel } from "./../models/usuariologado.model";
import { StringUtils } from './../util/stringutils';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UsuarioLogadoService{
    constructor() {}

    getAuthHeader(): RequestOptions {
        let token = localStorage.getItem('FLENT.token');

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    localTokenCompleto(): string {
        return localStorage.getItem('FLENT.token');
    }

    localUsuarioCodigo(): string{
        return localStorage.getItem('FLENT.id');
    }

    localUsuarioCompleto(): UsuarioLogadoModel{
        var json = '{' + 
                    '"id":"' + localStorage.getItem('FLENT.id') + '",' + 
                    '"name":"' + localStorage.getItem('FLENT.name') + '",' + 
                    '"role":"' + localStorage.getItem('FLENT.role') + '",' + 
                    '"token":"' + localStorage.getItem('FLENT.token') + '"' + 
                   '}';

        return JSON.parse(json);
    }
    
    localSaveTokenUsuario(response: any){
        localStorage.setItem('FLENT.id', response.data.id);
        localStorage.setItem('FLENT.name', response.data.name);
        localStorage.setItem('FLENT.role', response.data.role);
        localStorage.setItem('FLENT.token', response.data.token);
    }

    locallogout() {
        localStorage.removeItem('FLENT.id');
        localStorage.removeItem('FLENT.name');
        localStorage.removeItem('FLENT.role');
        localStorage.removeItem('FLENT.token');
    }

    localVerificaUsuarioLogado(): boolean{
        if(StringUtils.isNullOrEmpty(localStorage.getItem('FLENT.token'))) {
            return false;
        }else{
            return true;
        }
    }

    localIsAuthenticated(): boolean {
        let token = localStorage.getItem('FLENT.token');
        
        const jwtHelperService = new JwtHelperService();
        return !jwtHelperService.isTokenExpired(token);
    }
}