import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { DashboardService } from 'src/app/pages/services/dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-monthbar',
  templateUrl: './monthbar.component.html',
  styleUrls: ['./monthbar.component.css']
})
export class MonthbarComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(private dashboardService:DashboardService) {}
  ngOnInit(): void {

    this.dashboardInformation();
   
  }

  information:any;
  dashboardInformation(){
    let month:any[] = [];
    let memberNumber:any[] = [];
    this.dashboardService.getDshboardInfo().subscribe((resp:any)=>{
      this.information = resp;
     
      
      resp.applicationInMonth.map((data:any)=>{
        month.push(data.month)
        memberNumber.push(data.memberNumber)
     
      })
      let chart_02 = {
        series: [
          {
            name: "member",
            data: memberNumber
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" 
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val:any) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },
  
        xaxis: {
          categories:month,
          position: "top",
          labels: {
            offsetY: -18
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false,
            formatter: function (val:any) {
              return val + "%";
            }
          }
        },
        title: {
          text: "Monthly Inflation in Argentina, 2002",
  
          offsetY: 320,
          align: "center",
          style: {
            color: "#444"
          }
        }
      };

      let ChartBar = new ApexCharts(document.querySelector("#chart2"),chart_02);
      ChartBar.render();
      
    })
  }






}
