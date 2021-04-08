import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { Router } from '@angular/router';
import { Routes } from './../../routes/routes';


import { UsuarioLogadoModel } from './../../models/usuariologado.model';
import { DomainNotificationModel } from "./../../models/domainnotification.model";

import { UsuarioLogadoService } from './../../services/usuariologado.service';

declare const $: any;

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    
    public usuarioLogado: UsuarioLogadoModel;
    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];

    constructor(private router: Router, private usuarioLogadoService: UsuarioLogadoService) {}

    ngOnInit() {
        this.menuItems = Routes.filter(menuItem => menuItem);

        this.usuarioLogado = this.usuarioLogadoService.localUsuarioCompleto();
    }
    
    Logout(){
        this.usuarioLogadoService.locallogout();
        this.router.navigate(['/login']);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
