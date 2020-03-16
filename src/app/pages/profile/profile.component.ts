import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/services.index';
//import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;

  // imagen que se cargará con el inputFile
  imagenSubir: File;

  // imagen temporal
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    // solo actualizo email si NO es de Google
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  // solo selecciona la imagen, no la actualiza aun en la BD
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // validacion
    if (archivo.type.indexOf('image') < 0) {
      swal('El archivo seleccionado no es una imagen', archivo.name, 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // es una imagen, la cargo en imagenTemp
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result.toString());
  }

  // cambia la imagen en la BD
  cambiarImagen() {
    console.log('cambiar imagen');
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
