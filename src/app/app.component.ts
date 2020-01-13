import { Component } from '@angular/core';
import { SettingsService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';

  // solo con inyectar se llama al contructor del servicio, que incluye cargarAjustes
  constructor(public _ajustes: SettingsService) {}
}
