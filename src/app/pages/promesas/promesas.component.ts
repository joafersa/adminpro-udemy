import { Component, OnInit } from "@angular/core";
import { longStackSupport } from "q";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    let promesa = this.contarTres();

    // acaba la promesa
    promesa
      .then(mensaje => console.log("Terminó la promesa", mensaje))
      .catch(error => console.log("Error en promesa", error));
  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;

        console.log(contador);

        if (contador === 3) {
          //reject("Simplemente un error");
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
