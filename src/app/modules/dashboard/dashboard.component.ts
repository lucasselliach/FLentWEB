import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { DomainNotificationModel } from "./../../shared/models/domainnotification.model";

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    
    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];


    constructor(private spinner: NgxSpinnerService, private chRef: ChangeDetectorRef) {}

    ngOnInit() {
      this.spinner.show();
    }
}
