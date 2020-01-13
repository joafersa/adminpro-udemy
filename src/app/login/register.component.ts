///////////////////////////////////
// REACTIVE FORM
///////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

// para llamar a un script de fuera de Angular
// edito custom.js e incluyo todo el contenido en la funcion init_plugins
// para poder usarla la declaro
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  sonIguales(campo1: string, campo2: string) {
    // devuelve una funcion
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      // si PASA la validación devuelvo null
      if (pass1 === pass2) {
        return null;
      }
      // si NO PASA la validación devuelvo el objeto
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false) // false=valor por defecto, si no pongo required es opcional
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    // valor por defecto
    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: false
    });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    console.log('Formulario válido', this.forma.valid);

    // creo el objeto usuario
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    // llamo al servicio
    this._usuarioService
      .crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }
}
