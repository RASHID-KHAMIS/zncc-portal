import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboardAPI = environment.baseUrl + "Dashboards"
  constructor(private http:HttpClient) { }

  getDshboardInfo(){
    return this.http.get(this.dashboardAPI)
  }
}
