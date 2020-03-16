import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/services.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { MedicoComponent } from './medico.component';

//import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarMedicos();

    // debo estar enterado de cualquier emisión de modal-upload.service
    this._modalUploadService.notificacion.subscribe(resp =>
      this.cargarMedicos()
    );
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos().subscribe((resp: any) => {
      console.log(resp);
      this.medicos = resp;
      this.totalRegistros = this._medicoService.totalMedicos;
      this.cargando = false;
    });
  }

  // busqueda letra a letra
  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    // console.log(termino);
    this.cargando = true;
    this._medicoService
      .buscarMedicos(termino)
      .subscribe((medicos: Medico[]) => {
        // console.log(medicos);
        this.medicos = medicos;
        this.cargando = false;
      });
  }

  borrarMedico(medico: Medico) {
    // console.log(medico);
    swal({
      title: '¿Está seguro?',
      text: 'Va a borrar el medico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      // devuelve true si se responde OK
      // console.log(borrar);

      if (borrar) {
        this._medicoService.borrarMedico(medico._id).subscribe(borrado => {
          // console.log(borrado);
          // cargo de nuevo la lista
          this.cargarMedicos();
        });
      }
    });
  }
}
