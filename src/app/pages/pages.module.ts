import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// modulos
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

// componentes
import { PagesComponent } from "./pages.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { GraficaDonutComponent } from "../components/grafica-donut/grafica-donut.component";
import { AccountSettingsComponent } from "../components/pages/account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

// rutas
import { PAGES_ROUTES } from "./pages.routes";

// temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";

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
    RxjsComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, CommonModule]
})
export class PagesModule {}
