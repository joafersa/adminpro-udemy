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
  @Input() doughnutChartLabels: string[] = [];
  @Input() doughnutChartData: number[] = [];
  @Input() doughnutChartType: string = "";

  constructor() {}

  ngOnInit() {}
}
