///////////////////////////////////
// TEMPLATE FORM
///////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

// para llamar a un script de fuera de Angular
// edito custom.js e incluyo todo el contenido en la funcion init_plugins
// para poder usarla la declaro
declare function init_plugins();

// Google Api
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  // objeto necesario para autenticación Google
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();

    this.googleInit();

    // recordamos el email del localStorage
    this.email = localStorage.getItem('email') || ''; // se usa || '' para evitar error si la primera parte devuelve undefined
    // si el email se ha recordado, mantenemos el check
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '441381625141-gfuo7i3ger887sl0iudanjangomkbgf3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // perfil de Google, ahora no es necesario pero podría ser útil
      // let profile = googleUser.getBasicProfile();
      // console.log(profile);

      // token de Google
      let token = googleUser.getAuthResponse().id_token;
      // console.log(token);
      this._usuarioService.loginGoogle(token).subscribe(resp => {
        console.log(resp);

        //this.router.navigate(['/dashboard']); a veces va mal, lo reemplazo por redirección manual
        window.location.href = '#/dashboard';

        // toda la linea anterior se puede sustituir por lo siguiente, porque no me interesa la respuesta
        // this._usuarioService.loginGoogle(token).subscribe(() => window.location.href = '#/dashboard');
      });
    });
  }

  iniciaSesion(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    console.log(forma.value);

    // creo el objeto usuario
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    // llamo al servicio
    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/dashboard']);
      });
  }
}
