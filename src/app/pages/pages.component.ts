import { Component, OnInit } from '@angular/core';

// idem a login.component
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  anyo: number = new Date().getFullYear();

  constructor() {}

  ngOnInit() {
    init_plugins();
  }
}
