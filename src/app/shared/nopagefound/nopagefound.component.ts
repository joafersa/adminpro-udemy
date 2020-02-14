import { Component, OnInit } from '@angular/core';

// para llamar a un script de fuera de Angular
// edito custom.js e incluyo todo el contenido en la funcion init_plugins
// para poder usarla la declaro
declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    init_plugins();
  }
}
