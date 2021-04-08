import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

import sweetalert2 from 'sweetalert2';

import { FriendsModel } from '../friends.model';
import { DomainNotificationModel } from "../../../shared/models/domainnotification.model";

import { FriendsService } from '../friends.service';

import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

@Component({
    selector: 'app-friend-list-cmp',
    templateUrl: 'friendlist.component.html'
})

export class FriendListComponent implements OnInit {
    public friendList: FriendsModel[];
        
    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];

    constructor(private friendsService: FriendsService, private spinner: NgxSpinnerService, private chRef: ChangeDetectorRef) {}

    ngOnInit() {
        
        this.spinner.show();   
        
        this.friendsService.getFriends()
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
            this.friendList = response.data;        
            this.loadTableInformation(response.data);
        }

        this.spinner.hide();   
    }
    
    getOnError(response: any){
        this.errorMessage = response; 
        console.error(response);
        this.spinner.hide();   
    }


    deleteOnClick(friend: FriendsModel){
        
        sweetalert2({
            title: 'Excluir esse amigo?',
            text: "A exclusão será permanente!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Sim, eu quero.',
            buttonsStyling: false
          }).then((result) => {
            if (result.value) {
                this.spinner.hide();   
          
                this.friendsService.deleteFriend(friend.id)
                .subscribe(
                result => { this.deleteOnComplete(result, friend)},
                error => { this.deleteOnError(error)}
                );
                
                this.spinner.hide();   

                sweetalert2(
                {
                  title: 'Amigo excluido!',
                  text: 'Seu amigo está eliminado.',
                  type: 'success',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false
                }
              )
            }
        })   
    }

    deleteOnComplete(response: any, friend: FriendsModel){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.friendList.splice(this.friendList.indexOf(friend), 1);
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
