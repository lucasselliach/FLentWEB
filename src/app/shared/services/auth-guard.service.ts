import { Injectable } from "@angular/core";
import { Router, CanActivate } from '@angular/router';

import { UsuarioLogadoService } from "./usuariologado.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private usuarioLogadoService: UsuarioLogadoService) {}

    canActivate(): boolean {
        if (!this.usuarioLogadoService.localIsAuthenticated()) {
            
            this.usuarioLogadoService.locallogout();
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}