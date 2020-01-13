import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  // referencia a elemento html
  @ViewChild("txtPorcentaje", { static: false }) txtPorcentaje: ElementRef;

  // las dos variables vienen desde fuera
  @Input("nombre") leyenda: string = "Leyenda"; // viene la variable "nombre" y la asigna a "leyenda"
  @Input() porcentaje: number = 50; // la variable que viene tiene el mismo nombre, "porcentaje"

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // aquí aún no se han recibido los input
    // console.log("Constructor Leyenda: ", this.leyenda);
    // console.log("Constructor Porcentaje: ", this.porcentaje);
  }

  ngOnInit() {
    // ver la diferencia en los valores del contructor y aquí
    // console.log("ngOnInit Leyenda: ", this.leyenda);
    // console.log("ngOnInit Porcentaje: ", this.porcentaje);
  }

  cambiarValor(valor: number) {
    // comprobaciones
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje += valor;

    // comprobaciones
    if (this.porcentaje >= 100) {
      this.porcentaje = 100;
    }
    if (this.porcentaje <= 0) {
      this.porcentaje = 0;
    }

    // emite el valor de salida
    this.cambioValor.emit(this.porcentaje);

    //poner el foco
    this.txtPorcentaje.nativeElement.focus();
  }

  onChanges(newValue: number) {
    console.log(newValue);
    console.log(this.txtPorcentaje);

    // prevenir valores erróneos (Javascript)
    // let elementoHtml: any = document.getElementsByName("porcentaje")[0];

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    // prevenir valores erróneos
    // elementoHtml.value = this.porcentaje;
    this.txtPorcentaje.nativeElement.value = this.porcentaje;

    // emite el valor de salida
    this.cambioValor.emit(this.porcentaje);
  }
}
