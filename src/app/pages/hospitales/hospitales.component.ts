import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

//import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();

    // debo estar enterado de cualquier emisión de modal-upload.service
    this._modalUploadService.notificacion.subscribe(resp =>
      this.cargarHospitales()
    );
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      // console.log(resp);
      this.hospitales = resp;
      this.totalRegistros = this._hospitalService.totalHospitales;
      this.cargando = false;
    });
  }

  // busqueda letra a letra
  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    // console.log(termino);

    this.cargando = true;
    this._hospitalService
      .buscarHospitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        // console.log(hospitales);
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  borrarHospital(hospital: Hospital) {
    // console.log(hospital);
    swal({
      title: '¿Está seguro?',
      text: 'Va a borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      // devuelve true si se responde OK
      // console.log(borrar);

      if (borrar) {
        this._hospitalService
          .borrarHospital(hospital._id)
          .subscribe(borrado => {
            // console.log(borrado);
            // cargo de nuevo la lista
            this.cargarHospitales();
          });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  crearHospital() {
    swal({
      title: 'Nuevo hospital',
      text: 'Introduzca el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((nombre: string) => {
      if (!nombre || nombre.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(nombre).subscribe(hospital => {
        // console.log(hospital);
        // cargo de nuevo la lista
        this.cargarHospitales();
      });
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
}
