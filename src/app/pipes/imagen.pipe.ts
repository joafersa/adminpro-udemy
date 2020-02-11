import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  // tipo = usuario, medico, hospital, por defecto usuario
  transform(img: string, tipo: string = 'usuario'): any {
    // url común a todas las imágenes
    let url = URL_SERVICIOS + '/img';

    // si no viene imagen, devuelve url inexistente que lleva a imagen por defecto
    if (!img) {
      return url + '/usuarios/xxx';
    }

    // si la imagen es una url, es la imagen de Google, la devuelvo tal cual
    if (img.indexOf('https') >= 0) {
      return img;
    }

    // en otro caso puede ser imagen de usuario, médico o hospital
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('No existe el tipo de imagen (usuario, médico, hospital)');
        url += '/usuarios/xxx';
    }

    return url;
  }
}
