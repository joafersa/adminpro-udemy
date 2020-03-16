import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// componentes
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficaDonutComponent } from '../components/grafica-donut/grafica-donut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

// pipes
import { PipesModule } from '../pipes/pipes.module';

// rutas
import { PAGES_ROUTES } from './pages.routes';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonutComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalesComponent,
    ModalUploadComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    CommonModule,
    PipesModule
  ]
})
export class PagesModule {}
