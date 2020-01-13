import { Component, OnInit, Input } from "@angular/core";
import { Label, MultiDataSet } from "ng2-charts";
import { ChartType } from "chart.js";

@Component({
  selector: "app-grafica-donut",
  templateUrl: "./grafica-donut.component.html",
  styles: []
})
export class GraficaDonutComponent implements OnInit {
  @Input() leyenda: string = "";
  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];
  @Input() chartType: string = "";

  constructor() {}

  ngOnInit() {}
}
