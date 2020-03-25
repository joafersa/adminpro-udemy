import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { SubirArchivoService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  // lo quito de aquí para gestionarlo en modal-upload.service
  // oculto: string = '';

  // imagen que se cargará con el inputFile
  imagenSubir: File;
  // imagen temporal
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  // ==============================================
  //  seleccionImagen: solo selecciona la imagen, no la actualiza aun en la BD
  // ==============================================
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // validacion
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire(
        'El archivo seleccionado no es una imagen',
        archivo.name,
        'error'
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // es una imagen, la cargo en imagenTemp
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result.toString());
  }

  // ==============================================
  //  subirImagen
  // ==============================================
  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id
      )
      .then(resp => {
        console.log(resp);

        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log('Error en la carga de la imagen');
      });
  }

  // ==============================================
  //  cerrarModal
  // ==============================================
  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }
}
