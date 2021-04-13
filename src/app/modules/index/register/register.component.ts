import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Router } from '@angular/router';

import { RegisterUserService } from './register.service';
import { RegisterModel } from './register.model';

import { DomainNotificationModel } from "./../../../shared/models/domainnotification.model";

declare var $: any;

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
        
    public formGroup: FormGroup;

    public nameEhValido: boolean = false;
    public loginEhValido: boolean = false;
    public passwordEhValido: boolean = false;

    public registerModel: RegisterModel;

    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];  


    constructor(private formBuilder: FormBuilder, private element: ElementRef, private router: Router, private registerUserService: RegisterUserService) {
        this.registerModel = new RegisterModel();
    }
    
    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');

      this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            login: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }

    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
      body.classList.remove('off-canvas-sidebar');
    }    

    formGroupOnClick() {
        if (this.formGroup.valid) {

            let objeto = Object.assign({}, this.registerModel, this.formGroup.value);

            this.registerUserService.postRegister(objeto)
                .subscribe(
                    result => { this.onSubmitComplete(result) },
                    error => { this.OnSubmitError(error)}
                );
            
        } else {
            this.validateAllFormFields(this.formGroup);
        }
    }
    
    onSubmitComplete(response: any){ 
        this.errorMessage = "";
        this.listaDeErrosDoDominio = [];

        if(response.success === false){          
            console.log(response);

            this.listaDeErrosDoDominio = response.data;
            response.data.forEach(element => {
                this.showNotification('top','center', element.message)                
            });
        }else{
            this.router.navigate(['/login']);
        }
    }

    OnSubmitError(response: any){    
        this.errorMessage = "";
        this.listaDeErrosDoDominio = [];
        this.errorMessage = response; 
        console.error(response.data);
    }

    //Validate Rules

    nameValidation(e){
        if (e) {
            this.nameEhValido = true;
        }else{
            this.nameEhValido = false;
        }
    }

    loginValidation(e){
        if (e) {
            this.loginEhValido = true;
        }else{
            this.loginEhValido = false;
        }
    }
    
    passwordValidation(e){
        if (e) {
            this.passwordEhValido = true;
        }else{
            this.passwordEhValido = false;
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
    
    showNotification(from: any, align: any, messageShow: any) {
        const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

        const color = Math.floor((Math.random() * 6) + 1);

        $.notify({
            icon: 'notifications',
            message: messageShow
        }, {
            type: type[color],
            timer: 3000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          		'<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          		'<i class="material-icons" data-notify="icon">notifications</i> ' +
          		'<span data-notify="title">{1}</span> ' +
          		'<span data-notify="message">{2}</span>' +
          		'<div class="progress" data-notify="progressbar">' +
          			'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          		'</div>' +
          		'<a href="{3}" target="{4}" data-notify="url"></a>' +
          	'</div>'
        });
    }

}
