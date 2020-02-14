import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();

    // debo estar enterado de cualquier emisión de modal-upload.service
    this._modalUploadService.notificacion.subscribe(resp =>
      this.cargarUsuarios()
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      //console.log(resp);
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  // busqueda letra a letra
  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    // console.log(termino);

    this.cargando = true;
    this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        // console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    // console.log(usuario);
    // el usuario que quiero borrar no debe ser el usuario con el que estoy logueado
    if (usuario._id === this._usuarioService.usuario._id) {
      swal(
        'No se puede borrar el usuario',
        'No puede borrarse a si mismo',
        'error'
      );
      return;
    }
    swal({
      title: '¿Está seguro?',
      text: 'Va a borrar el usuario ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      // devuelve true si se responde OK
      // console.log(borrar);

      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(borrado => {
          // console.log(borrado);
          this.desde = 0; // vuelvo al 1º
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
