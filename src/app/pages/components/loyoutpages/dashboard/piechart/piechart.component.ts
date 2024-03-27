import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';
import { DashboardService } from 'src/app/pages/services/dashboard.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
})
export class PiechartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardInformation();
  }

  dashboardInformation() {
    let sectorName: any[] = [];
    let memberNumber: any[] = [];
    this.dashboardService.getDshboardInfo().subscribe((resp: any) => {
      resp.withBusinessSector.map((data: any) => {

        memberNumber.push(data.memberNumber*10);
        sectorName.push(data.sectorName);
      });

      this.chartOptions = {
        series: memberNumber,
        chart: {
          width: 500,
          type: 'pie',
        },
  
        labels: sectorName,
        responsive: [
          {
            breakpoint: 700,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    });
  }
}
