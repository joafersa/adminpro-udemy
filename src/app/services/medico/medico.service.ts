import { Injectable } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
//declare var swal: any;
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  medico: Medico;
  totalMedicos: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) {
    console.log('Servicio de médico listo');
  }

  // ==============================================
  // guardarMedico: crea un médico o lo actualiza
  // ==============================================
  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http
        .put(url, medico) // devuelvo un observable al que nos subscribiremos
        .pipe(
          map((resp: any) => {
            swal('Médico actualizado', medico.nombre, 'success');
            return resp.medico;
          })
        );
    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http
        .post(url, medico) // devuelvo un observable al que nos subscribiremos
        .pipe(
          map((resp: any) => {
            swal('Médico creado', medico.nombre, 'success');
            return resp.medico;
          })
        );
    }
  }

  // ==============================================
  //  cargar medicos
  // ==============================================
  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';

    // devuelvo solo los medicos
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  // ==============================================
  //  obtener medico
  // ==============================================
  obtenerMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;

    // devuelvo solo el medico
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }

  // ==============================================
  //  buscar medicos
  // ==============================================
  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(map((resp: any) => resp.medicos)); //devuelvo solo los medicos
  }

  // ==============================================
  //  borrar medico
  // ==============================================
  borrarMedico(id: string) {
    let url =
      URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map(resp => {
        swal('Médico borrado', 'El médico ha sido eliminado', 'success');
        return true;
      })
    );
  }
}
