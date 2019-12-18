import { Component, OnInit, Input } from '@angular/core';

import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() from: any;
  @Input() to: any;

  datapoints = [];
  loading: boolean;
  errormsg: string;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.loading = true;
    this.getChartData();
  }

  getChartData() {
    const xAxis = [];
    const yAxis = [];
    const dataArr = [];
    this.datapoints = [];
    let x = this.chartService.getDataMonth(this.from, this.to).subscribe(
      res => {
        if(res['Error Message']) {
          this.errormsg = 'Chart not available';
        }
      x = res['Time Series FX (Monthly)'];
      for (const i in x) {
        dataArr.push([i, x[i]]);
      }
      for (let i = 0; i < 30; i++) {
        yAxis.push(Number(dataArr[i][1]['4. close']));
      }
      for (let i = 30; i > 0; i--) {
        xAxis.push(dataArr[i][0]);
      }
      const datapoints = [];
      for (let i = 0; i < 30; i++) {
        datapoints[i] = { y: yAxis[i], label: xAxis[i]};
      }
      this.datapoints = datapoints;
      this.renderChart(this.from, this.to);
    });
  }

  renderChart(from, to) {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: `${from} to ${to} Chart`
      },
      data: [{
        type: 'line',
        dataPoints: this.datapoints
      }]
    });
    chart.render();
    this.loading = false;
  }
}
