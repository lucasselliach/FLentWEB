import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { DomainNotificationModel } from "./../../shared/models/domainnotification.model";

import { LendsService } from './../lend/lends.service';
import { GamesService } from './../game/games.service';
import { FriendsService } from './../friend/friends.service';

import { LendsModel } from './../lend/lends.model';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public lendList: LendsModel[];

  public friendsCount: string;  
  public gamesCount: string;  
  public lendsCount: string;  

  public errorMessage: string = "";
  public listaDeErrosDoDominio: DomainNotificationModel[] = [];

    constructor(private spinner: NgxSpinnerService, private lendsService:LendsService, private gamesService:GamesService, private friendsService:FriendsService, private chRef: ChangeDetectorRef) {}

    ngOnInit() {
      this.spinner.show();
      
      this.lendsService.getLends()
      .subscribe(
        result => { this.getOnComplete(result)},
        error => { this.getOnError(error)}
      );  
      
      this.lendsService.getLendsCount()
        .subscribe(
          result => { this.onLendsComplete(result) },
          error => { this.OnLendsError(error)}
        );

      this.gamesService.getGamesCount()
        .subscribe(
          result => { this.onGamesComplete(result) },
          error => { this.OnGamesError(error)}
        );
      
      this.friendsService.getFriendsCount()
        .subscribe(
          result => { this.onFriendsComplete(result) },
          error => { this.OnFriendsError(error)}
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

    onLendsComplete(response: any){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.lendsCount = response.data;        
        }
    }
    
    OnLendsError(response: any){
        this.errorMessage = response; 
        console.error(response);
    }

    onGamesComplete(response: any){
      this.errorMessage = "";

      if(response.success === false){
          this.listaDeErrosDoDominio = response.data;
      }else{
          this.gamesCount = response.data;        
      }
    }
    
    OnGamesError(response: any){
        this.errorMessage = response; 
        console.error(response);
    }

    onFriendsComplete(response: any){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.friendsCount = response.data;        
        }

        this.spinner.hide();   
    }

    OnFriendsError(response: any){
        this.errorMessage = response; 
        console.error(response);
        this.spinner.hide();   
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
