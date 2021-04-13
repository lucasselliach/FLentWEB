import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";

import { LendsCreateModel } from './../lends.model';
import { FriendsModel } from './../../friend/friends.model';
import { GamesModel } from './../../game/games.model';

import { DomainNotificationModel } from "./../../../shared/models/domainnotification.model";

import { LendsService } from './../lends.service';
import { FriendsService } from '../../friend/friends.service';
import { GamesService } from '../../game/games.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-lend-create-cmp',
    templateUrl: 'lendcreate.component.html'
})

export class LendCreateComponent implements OnInit {    
    public formGroup : FormGroup;

    public friendList: FriendsModel[];
    public initialValueFriend: FriendsModel;
    public selectedValueFriend: FriendsModel;

    public gameList: GamesModel[];
    public initialValueGame: GamesModel;
    public selectedValueGame: GamesModel;
            
    public deadlineDateEhValido: boolean = false;

    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];  

    public startDateDatePickerDeadlineDate = new Date(2021, 0, 1);
    public minDateDatePickerDeadlineDate = new Date(2021, 0, 1);
    public maxDateDatePickerDeadlineDate = new Date(2099, 0, 1);

    constructor(private formBuilder: FormBuilder, private friendsService: FriendsService, private gamesService: GamesService, private spinner: NgxSpinnerService, private lendsService: LendsService, private router: Router) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            deadlineDate: [null, Validators.required]
        });

        this.spinner.show();   
        
        this.friendsService.getFriends()
        .subscribe(
          result => { this.getFriendsOnComplete(result)},
          error => { this.getFriendsOnError(error)}
        );  
        
        this.gamesService.getGamesAvailable()
        .subscribe(
          result => { this.getGamesOnComplete(result)},
          error => { this.getGamesOnError(error)}
        );  
    }
    
    getFriendsOnComplete(response: any){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.friendList = response.data;
            this.initialValueFriend = this.friendList[0];
            this.selectedValueFriend = this.friendList[0];
        } 
    }
    
    getFriendsOnError(response: any){
        this.errorMessage = response; 
        console.error(response);
        this.spinner.hide();   
    }

    getGamesOnComplete(response: any){
        this.errorMessage = "";

        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.gameList = response.data;  
            this.initialValueGame = this.gameList[0];
            this.selectedValueGame = this.gameList[0];      
        }

        this.spinner.hide();   
    }
    
    getGamesOnError(response: any){
        this.errorMessage = response; 
        console.error(response);
        this.spinner.hide();   
    }

    gameChanged(game: GamesModel){
        this.selectedValueGame = game;
    }

    friendChanged(friend: FriendsModel){
        this.selectedValueFriend = friend;
    }

    formGroupOnClick() {
        if (this.formGroup.valid) {
            let lendCreateModel = new LendsCreateModel();
            lendCreateModel.gamerId = this.selectedValueGame.id;
            lendCreateModel.friendId = this.selectedValueFriend.id;
            lendCreateModel.deadlineDate =  JSON.stringify(this.formGroup.value.deadlineDate);

            this.spinner.show();
            
            console.log(lendCreateModel);

            this.lendsService.postLend(lendCreateModel)
                .subscribe(
                    result => { this.onComplete(result) },
                    error => { this.onError(error) }
                );
            
        } else {
            this.validateAllFormFields(this.formGroup);
        }
    }

    onComplete(response: any){ 
        this.errorMessage = "";
        this.listaDeErrosDoDominio = [];

        this.spinner.hide();
            
        if(response.success === false){
            this.listaDeErrosDoDominio = response.data;
        }else{
            this.router.navigate(['/lendslist']);
        }
    }

    onError(response: any){    
        this.errorMessage = "";
        this.listaDeErrosDoDominio = [];
        this.errorMessage = response; 
        console.error(response.data);
        
        this.spinner.hide();
    }


    // Validate Rules

    deadlineDateValidation(e){
        if (e) {
            this.deadlineDateEhValido = true;
        }else{
            this.deadlineDateEhValido = false;
        }
    }

    //Validate Enginer

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
        });
    }
    
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }

    //General
    
    private validateFormValueIsNull(value: string, defaultValue: string) {
        if(value === null){
            return defaultValue;
        } else {
            return value;
        }
    }
}
