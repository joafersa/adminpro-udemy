import { NgModule } from '@angular/core';
// necesario para ngif, ngfor, pipes ...
import { CommonModule } from '@angular/common';
// necesario para usar routerLink
import { RouterModule } from '@angular/router';
// pipes
import { PipesModule } from '../pipes/pipes.module';

// componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule],
  declarations: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  exports: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule {}
