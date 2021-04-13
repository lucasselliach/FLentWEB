import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Router } from '@angular/router';

import { RegisterUserService } from './register.service';
import { RegisterModel } from './register.model';

declare var $: any;

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
        
    public angularForm: FormGroup;
    public name: FormControl;
    public login: FormControl;
    public password: FormControl;
    
    public registerModel: RegisterModel;

    public errorMessage: string = "";

    constructor(private element: ElementRef, private router: Router, private registerUserService: RegisterUserService) {

        
        this.registerModel = new RegisterModel();
    }
    
    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');

      this.createFormControls();
      this.createForm();
    }

    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
      body.classList.remove('off-canvas-sidebar');
    }    

    createFormControls() {
        this.name = new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
        ]);
        this.login = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16)
        ]);
    }
    
    createForm() {
        this.angularForm = new FormGroup({
            name: this.name,
            login: this.login,
            password: this.password
        });
    }

    onSubmit() {
        if (this.angularForm.valid) {
            let objeto = Object.assign({}, this.registerModel, this.angularForm.value);

            this.registerUserService.postRegister(objeto)
            .subscribe(
            result => { this.onSubmitComplete(result) },
            error => { this.OnSubmitError(error)}
            );
        }
    }

    onSubmitComplete(response: any) {
        this.angularForm.reset();
        this.errorMessage = "";
         
        console.log(response);

        if(response.success === false){
            console.log(response);
            response.data.forEach(element => {
                // this.showNotification('top','center', element.message)                
            });
        }else{
            this.router.navigate(['/login']);
        }
    }

    OnSubmitError(response: any){
        this.errorMessage = "";
        this.errorMessage = response; 
        console.error(response.data);
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
