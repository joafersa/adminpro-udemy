import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
//import swal from 'sweetalert';
declare var swal: any;
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log('Servicio de hospital listo');
  }

  // ==============================================
  // crearHospital
  // ==============================================
  crearHospital(nombre: string) {
    let url =
      URL_SERVICIOS + '/hospital' + '?token=' + this._usuarioService.token;

    return (
      this.http
        // pongo nombre entre llaves porque necesito enviar { nombre:nombre }
        .post(url, { nombre }) // devuelvo un observable al que nos subscribiremos
        .pipe(
          map((resp: any) => {
            swal('Hospital creado', nombre, 'success');
            return resp.hospital;
          })
        )
    );
  }

  // ==============================================
  //  actualizar hospital
  // ==============================================
  actualizarHospital(hospital: Hospital) {
    let url =
      URL_SERVICIOS +
      '/hospital/' +
      hospital._id +
      '?token=' +
      this._usuarioService.token;

    // console.log(url);

    return this.http
      .put(url, hospital) // devuelvo un observable al que nos subscribiremos
      .pipe(
        map((resp: any) => {
          swal('Hospital actualizado', hospital.nombre, 'success');
          return true;
        })
      );
  }

  // ==============================================
  //  cambiar imagen de hospital id
  // ==============================================
  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, 'hospitales', id)
      .then((resp: any) => {
        console.log(resp);
        this.hospital.img = resp.hospital.img;
        // mensaje
        swal('Imagen actualizada', this.hospital.nombre, 'success');
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  // ==============================================
  //  cargar hospitales
  // ==============================================
  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';

    // devuelvo solo los hospitales
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }

  // ==============================================
  //  obtener hospital
  // ==============================================
  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    // devuelvo solo el hospital
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  // ==============================================
  //  buscar hospitales
  // ==============================================
  buscarHospitales(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(map((resp: any) => resp.hospitales)); //devuelvo solo los hospitales
  }

  // ==============================================
  //  borrar hospital
  // ==============================================
  borrarHospital(id: string) {
    let url =
      URL_SERVICIOS +
      '/hospital/' +
      id +
      '?token=' +
      this._usuarioService.token;

    return this.http.delete(url).pipe(
      map(resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado', 'success');
        return true;
      })
    );
  }
}
