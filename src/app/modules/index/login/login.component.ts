import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { LoginModel } from './login.model';

import { UsuarioLogadoService } from './../../../shared/services/usuariologado.service';

import { DomainNotificationModel } from "./../../../shared/models/domainnotification.model";

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

    public angularForm: FormGroup;
    public login: FormControl;
    public password: FormControl;
    
    public loginModel: LoginModel;

    public errorMessage: string = "";
    public listaDeErrosDoDominio: DomainNotificationModel[] = [];  

    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(private element: ElementRef, private router: Router, private loginService: LoginService, private usuarioLogadoService: UsuarioLogadoService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

        this.loginModel = new LoginModel();
    }

    ngOnInit() {    
        this.createFormControls();
        this.createForm();

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        if(this.usuarioLogadoService.localVerificaUsuarioLogado()){
            this.router.navigate(['/dashboard']);
        }

    }
    
    createFormControls() {
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
            login: this.login,
            password: this.password
        });
    }

    onSubmit() {
        console.log(this.angularForm);

        if (this.angularForm.valid) {
            let objeto = Object.assign({}, this.loginModel, this.angularForm.value);

            this.loginService.postLogin(objeto)
            .subscribe(
            result => { this.onSubmitComplete(result) },
            error => { this.OnSubmitError(error)}
            );
        }
    }

    onSubmitComplete(response: any) {
        this.angularForm.reset();
        this.errorMessage = "";
         
        // console.log(response);

        if(response.success === false){
            console.log(response);
            this.listaDeErrosDoDominio = response.data;
            response.data.forEach(element => {
                this.showNotification('top','center', element.message)                
            });
        }else{
            this.usuarioLogadoService.localSaveTokenUsuario(response);
            
            this.router.navigate(['/dashboard']);
        }
    }

    OnSubmitError(response: any){
        this.errorMessage = "";
        this.listaDeErrosDoDominio = [];
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


    //Método de controle do sidebar
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    //Método de fechamento da tela
    ngOnDestroy(){
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }
}
