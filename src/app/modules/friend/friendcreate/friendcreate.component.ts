import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";

import { FriendsCreateModel } from './../friends.model';

import { DomainNotificationModel } from "./../../../shared/models/domainnotification.model";

import { FriendsService } from './../friends.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-friend-create-cmp',
    templateUrl: 'friendcreate.component.html'
})

export class FriendCreateComponent implements OnInit {    
    public formGroup : FormGroup;
    
    public nameEhValido: boolean = false;
    public nickNameEhValido: boolean = false;
    public emailValido: boolean = false;
    public phoneNumber01Valido: boolean = false;

    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];  

    constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private friendsService: FriendsService, private router: Router) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            nickName: [null, [Validators.maxLength(40)]],
            email: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            phoneNumber01: [null, Validators.maxLength(20)]//[Validators.maxLength(20), Validators.pattern("^[1-9]{2} (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$")]]
        });
    }
    
    formGroupOnClick() {
        if (this.formGroup.valid) {
            let friendCreateModel = new FriendsCreateModel();
            friendCreateModel.name = this.formGroup.value.name;
            friendCreateModel.nickName = this.formGroup.value.nickName;
            friendCreateModel.email = this.formGroup.value.email;
            friendCreateModel.phoneNumber01 = this.formGroup.value.phoneNumber01;

            this.spinner.show();
            
            this.friendsService.postFriend(friendCreateModel)
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
            this.router.navigate(['/friendslist']);
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

    nickNameValidation(e){
        if (e) {
            this.nickNameEhValido = true;
        }else{
            this.nickNameEhValido = false;
        }
    }

    emailValidation(e){
        if (e) {
            this.emailValido = true;
        }else{
            this.emailValido = false;
        }
    }

    phoneNumber01Validation(e){
        if (e) {
            this.phoneNumber01Valido = true;
        }else{
            this.phoneNumber01Valido = false;
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
