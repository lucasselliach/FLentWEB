import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { GamesEditModel, GamesModel } from './../games.model';

import { DomainNotificationModel } from "./../../../shared/models/domainnotification.model";

import { GamesService } from './../games.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-game-edit-cmp',
    templateUrl: 'gameedit.component.html'
})

export class GameEditComponent implements OnInit {    
    public formGroup : FormGroup;

    public gameId: string;
    public game: GamesModel;
    
    public nameEhValido: boolean = false;

    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];  

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,  private spinner: NgxSpinnerService, private gamesService: GamesService, private router: Router) {}

    ngOnInit() {
        this.gameId = this.route.snapshot.paramMap.get('gameid');
        
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        });

        this.spinner.show();

        this.gamesService.getGame(this.gameId)
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
            this.game = response.data;

            this.formGroup.patchValue({
                name: this.game.name
            });

        }
        
        this.spinner.hide();
    }
    
    getOnError(response: any){
        this.errorMessage = response; 
        console.error(response);

        this.spinner.hide();
    }


    formGroupOnClick() {
        if (this.formGroup.valid) {
            let gameEditModel = new GamesEditModel();
            gameEditModel.id = this.gameId;
            gameEditModel.name = this.formGroup.value.name;

            this.spinner.show();

            this.gamesService.putGame(gameEditModel)
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
            this.router.navigate(['/gameslist']);
        }
    }

    onError(response: any){    
        this.errorMessage = "";
        this.listaDeErrosDoDominio = [];
        this.errorMessage = response; 
        console.error(response.data);
        
        this.spinner.hide();
    }


    //Validate Rules

    nameValidation(e){
        if (e) {
            this.nameEhValido = true;
        }else{
            this.nameEhValido = false;
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
