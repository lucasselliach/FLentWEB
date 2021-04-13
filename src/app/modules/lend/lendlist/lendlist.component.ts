import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Router } from "@angular/router";

import sweetalert2 from 'sweetalert2';

import { LendsModel } from '../lends.model';
import { DomainNotificationModel } from "../../../shared/models/domainnotification.model";

import { LendsService } from '../lends.service';

import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

@Component({
    selector: 'app-lend-list-cmp',
    templateUrl: 'lendlist.component.html'
})

export class LendListComponent implements OnInit {
    public lendList: LendsModel[];
        
    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];

    constructor(private lendsService: LendsService, private spinner: NgxSpinnerService, private chRef: ChangeDetectorRef, private router: Router) {}

    ngOnInit() {
        
        this.spinner.show();   
        
        this.lendsService.getLends()
        .subscribe(
          result => { this.getOnComplete(result)},
          error => { this.getOnError(error)}
        );  
    }

    getOnComplete(response: any){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.lendList = response.data;        
            this.loadTableInformation(response.data);
        }

        this.spinner.hide();   
    }
    
    getOnError(response: any){
        this.errorMessage = response; 
        console.error(response);
        this.spinner.hide();   
    }

    ActionOnClick(lend: LendsModel){
        
        sweetalert2({
            title: 'Realizar devolução do jogo' + lend.game.name + '?',
            text: '- ' + lend.title + ' -' + 'será desfeito.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Sim, eu quero.',
            buttonsStyling: false
          }).then((result) => {
            if (result.value) {
                this.spinner.hide();   
          
                this.lendsService.putLendDeactive(lend.id)
                .subscribe(
                result => { this.OnComplete(result, lend)},
                error => { this.OnError(error)}
                );
                
                this.spinner.hide();   

                sweetalert2(
                {
                  title: 'Empréstimo devolvido!',
                  text: 'tudo deu certo, não é mesmo?',
                  type: 'success',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false
                }
              )
            }
        })   
    }

    OnComplete(response: any, lend: LendsModel){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.router.navigate(['/lendslist']);
        }
    }
    
    OnError(response: any){
        this.errorMessage = response; 
        console.error(response);
    }
        
    loadTableInformation(data: any){
        
        this.chRef.detectChanges();

        $('#datatables').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
            search: "_INPUT_",
            searchPlaceholder: "Search records",
            }

        });

        $('#datatables').DataTable();

        $('.card .material-datatables label').addClass('form-group');
    }
}
