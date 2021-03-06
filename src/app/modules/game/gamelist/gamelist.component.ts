import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import sweetalert2 from 'sweetalert2';

import { GamesModel } from '../games.model';
import { DomainNotificationModel } from "../../../shared/models/domainnotification.model";

import { GamesService } from '../games.service';

import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

@Component({
    selector: 'app-game-list-cmp',
    templateUrl: 'gamelist.component.html'
})

export class GameListComponent implements OnInit {
    public gameList: GamesModel[];
        
    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];

    constructor(private gamesService: GamesService, private spinner: NgxSpinnerService, private chRef: ChangeDetectorRef) {}

    ngOnInit() {
        
        this.spinner.show();   
        
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

        this.spinner.hide();   
    }
    
    getOnError(response: any){
        this.errorMessage = response; 
        console.error(response);
        this.spinner.hide();   
    }


    deleteOnClick(game: GamesModel){
        
        sweetalert2({
            title: 'Excluir esse jogo?',
            text: "A exclusão será permanente",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Sim, eu quero.',
            buttonsStyling: false
          }).then((result) => {
            if (result.value) {
                this.spinner.hide();   
          
                this.gamesService.deleteGame(game.id)
                .subscribe(
                result => { this.deleteOnComplete(result, game)},
                error => { this.deleteOnError(error)}
                );
                
                this.spinner.hide();   

                sweetalert2(
                {
                  title: 'Jogo excluido!',
                  text: 'Seu jogo está eliminado.',
                  type: 'success',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false
                }
              )
            }
        })   
    }

    deleteOnComplete(response: any, game: GamesModel){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.gameList.splice(this.gameList.indexOf(game), 1);
        }
    }
    
    deleteOnError(response: any){
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
