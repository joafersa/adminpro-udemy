import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/services.index';

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
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];
// no usarmos forRoot, sino forChild porque son rutas hijas
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
