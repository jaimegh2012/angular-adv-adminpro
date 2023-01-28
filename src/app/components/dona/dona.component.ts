import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  
  @Input() title: string = 'Sin titulo';
  @Input() data: number[] = [ 350, 450, 100 ];
  @Input('labels') public doughnutChartLabels: string[] = ['LabelOne', 'LabelTwo', 'LabelThree'];
  ngOnInit() {
    this.doughnutChartData.datasets[0].data = this.data; 
    this.doughnutChartData.labels = this.doughnutChartLabels; 
  }
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [], backgroundColor: ['#6857E6', '#009FEE', '#FFB414'] },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
