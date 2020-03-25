import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard, AdminGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          titulo: 'Dashboard',
          descripcion: 'Descripción de Dashboard'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          titulo: 'ProgressBar',
          descripcion: 'Descripción de ProgressBar'
        }
      },
      {
        path: 'graficas1',
        component: Graficas1Component,
        data: {
          titulo: 'Gráficas',
          descripcion: 'Descripción de Gráficas'
        }
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: {
          titulo: 'Promesas',
          descripcion: 'Descripción de Promesas'
        }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: {
          titulo: 'RxJs',
          descripcion: 'Descripción de RxJs'
        }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          titulo: 'Ajustes del tema',
          descripcion: 'Descripción de Ajustes del tema'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          titulo: 'Perfil del usuario',
          descripcion: 'Descripción de Perfil del usuario'
        }
      },
      {
        path: 'busqueda/:termino',
        component: BusquedaComponent,
        data: {
          titulo: 'Buscador',
          descripcion: 'Descripción de Buscador'
        }
      },

      // Mantenimientos
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: {
          titulo: 'Mantenimiento de usuarios',
          descripcion: 'Descripción de Mantenimiento de usuarios'
        }
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: {
          titulo: 'Mantenimiento de hospitales',
          descripcion: 'Descripción de Mantenimiento de hospitales'
        }
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: {
          titulo: 'Mantenimiento de médicos',
          descripcion: 'Descripción de Mantenimiento de médicos'
        }
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: {
          titulo: 'Actualizar médico',
          descripcion: 'Descripción de Actualizar médico'
        }
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];
// no usarmos forRoot, sino forChild porque son rutas hijas
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
