import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  constructor() {}

  // tipo: usuario, hospital, medico
  // id: del registro que quiero actualizar
  subirArchivo(archivo: File, tipo: string, id: string) {
    // usamos Javascript puro

    // devuelve una promesa
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      // llamada ajax
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        // ha acabado de subir
        if (xhr.readyState === 4) {
          // todo ha ido bien
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Falló la subida');
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      // llamada put asincrona
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
