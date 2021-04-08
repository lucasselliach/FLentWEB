import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import sweetalert2 from 'sweetalert2';

import { GamesModel } from '../games.model';
import { DomainNotificationModel } from "../../../shared/models/domainnotification.model";

import { GamesService } from '../games.service';

declare const $: any;

@Component({
    selector: 'app-game-list-cmp',
    templateUrl: 'gamelist.component.html'
})

export class GameListComponent implements OnInit {
    public gameList: GamesModel[];
        
    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];

    constructor(private gamesService: GamesService, private chRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.gamesService.getGames()
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
            this.gameList = response.data;        
            this.loadTableInformation(response.data);
        }
    }
    
    getOnError(response: any){
        this.errorMessage = response; 
        console.error(response);
    }


    // deleteOnClick(cliente: ClientesModel){
        
    //     sweetalert2({
    //         title: 'Excluir esse cliente?',
    //         text: "A exclusão será um processo de inativação do cliente.",
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonClass: 'btn btn-success',
    //         cancelButtonClass: 'btn btn-danger',
    //         confirmButtonText: 'Sim, eu quero.',
    //         buttonsStyling: false
    //       }).then((result) => {
    //         if (result.value) {
          
    //             this.clientesService.deleteCliente(cliente.codigo)
    //             .subscribe(
    //             result => { this.deleteClientesOnComplete(result, cliente)},
    //             error => { this.deleteOnError(error)}
    //             );
                
    //             sweetalert2(
    //             {
    //               title: 'Cliente excluido!',
    //               text: 'Seu cliente está inativo no sistema',
    //               type: 'success',
    //               confirmButtonClass: "btn btn-success",
    //               buttonsStyling: false
    //             }
    //           )
    //         }
    //     })   
    // }

    // deleteClientesOnComplete(response: any, cliente: ClientesModel){
    //     this.errorMessage = "";

    //     if(response.success === false){
    //         this.listaDeErrosDoDominio = response.data;
    //     }else{
    //         this.listaClientes.splice(this.listaClientes.indexOf(cliente), 1);
    //     }
    // }
    
    // deleteOnError(response: any){
    //     this.errorMessage = response; 
    //     console.error(response);
    // }
    
    
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
