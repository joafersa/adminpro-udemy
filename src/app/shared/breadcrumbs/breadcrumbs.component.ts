import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  descripcion: string;

  constructor(
    private router: Router,
    //clases que se inyectan para cambiar título de la página y meta tags
    private title: Title,
    private meta: Meta
  ) {
    this.getDataRoute().subscribe(data => {
      // console.log(data);
      this.titulo = data.titulo;
      this.descripcion = data.descripcion;

      // titulo de la pagina
      this.title.setTitle(this.titulo);

      //meta tags
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.descripcion
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {}

  getDataRoute() {
    return this.router.events.pipe(
      // extraer informacion: filter para filtrar solo los eventos ActivationEnd
      filter(evento => evento instanceof ActivationEnd),
      // vuelvo a filtrar para obtener el unico evento que me interesa, el que no tiene firstChild
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      // ahora extraigo data con el operardor map
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
