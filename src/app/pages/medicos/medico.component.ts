import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import {
  MedicoService,
  HospitalService
} from 'src/app/services/services.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  medico: Medico = new Medico('', '', '', '', ''); // al inicializar el médico, hospitalid = '' hace que esté seleccionada la opción "Seleccione hospital"
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    // leer url para obtener el id
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .cargarHospitales()
      .subscribe(hospitales => (this.hospitales = hospitales));

    // debo estar enterado de cualquier emisión de modal-upload.service
    this._modalUploadService.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico._id = medico._id;
      // despues de crear el médico navego a su página de edición /medico/id
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this._hospitalService
      .obtenerHospital(id)
      .subscribe(hospital => (this.hospital = hospital));
  }

  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id).subscribe(medico => {
      this.medico = medico;
      // en el médico del form, en el campo hospital tengo solo el id y dentro del objeto medico tengo otro objeto hospital
      this.medico.hospital = medico.hospital._id;
      // fuerzo el cambio de hospital para que recargue la imagen
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
