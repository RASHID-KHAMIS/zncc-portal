import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { DashboardService } from 'src/app/pages/services/dashboard.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
})
export class PiechartComponent implements OnInit {
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

      let chart_01 = {
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

      let chartPie = new ApexCharts(document.querySelector("#chart"),chart_01);
      chartPie.render()

    });
  }
}
