import { Component, OnInit, OnDestroy } from '@angular/core';
//promise pertenece a ES6 (no hace falta importarlo), pero Observable sí debe importarse

import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.devuelveObservable()

      // RETRY

      // retry infinito
      // .pipe(retry())

      // 2 reintentos (la ejecución normal + 2 reintentos)
      .pipe(retry(2))

      // ahora necesito subscribirme
      .subscribe(
        // 1r callback, cuando se llama a next, recibo algo del observador
        numero => console.log('Subs', numero),
        // 2o callback, cuando hay error
        error => console.log('Error en el observable', error),
        // 3r callback, cuando el observable termina
        () => console.log('El observable termina')
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('La página se va a cerrar');

    // fin subscripcion cuando cambio de pagina
    this.subscription.unsubscribe();
  }

  // devuelveObservable(): Observable<number> {
  //   return new Observable(observer => {
  //     let contador = 0;

  //     let intervalo = setInterval(() => {
  //       contador++;

  //       observer.next(contador);

  //       if (contador === 3) {
  //         clearInterval(intervalo);
  //         // desubscribirme
  //         observer.complete();
  //       }

  //       if (contador === 2) {
  //         clearInterval(intervalo); //importante para reiniciar el contador
  //         // ejemplo de error
  //         observer.error("Auxilio!");
  //       }
  //     }, 1000);
  //   });
  // }

  devuelveObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;

        // ahora, por ejemplo, el contador viene en el objeto salida. Tengo que mapearlo a un numero
        const salida = {
          valor: contador
        };

        // el observable emite el valor de salida
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   // desubscribirme
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo); //importante para reiniciar el contador
        //   // ejemplo de error
        //   observer.error("Auxilio!");
        // }
      }, 1000);
    }).pipe(
      // pipe admite varias operaciones separadas por coma: varios map, filter...
      // mapeo para transformar el objeto salida en el contador
      map((resp: any) => resp.valor),

      // filtro (devuelve true o false) Ej. filtro num impares
      filter((valor, index) => {
        // console.log('Filter', valor, index);

        // impar
        if (valor % 2 === 1) {
          return true;
          // par
        } else {
          return false;
        }
      })
    );
  }
}
