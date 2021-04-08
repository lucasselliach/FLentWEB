import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";

import { GamesCreateModel } from './../games.model';

import { DomainNotificationModel } from "./../../../shared/models/domainnotification.model";

import { GamesService } from './../games.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-game-create-cmp',
    templateUrl: 'gamecreate.component.html'
})

export class GameCreateComponent implements OnInit {    
    public formGroup : FormGroup;
    
    public nameEhValido: boolean = false;

    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];  

    constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private gamesService: GamesService, private router: Router) {}

    ngOnInit() {
       this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        });
    }
    
    formGroupOnClick() {
        if (this.formGroup.valid) {
            let gameCreateModel = new GamesCreateModel();
            gameCreateModel.name = this.formGroup.value.name;

            this.spinner.show();
            
            this.gamesService.postGame(gameCreateModel)
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
