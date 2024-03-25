import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  zoneAPI = environment.baseUrl + "Zones";
  constructor(private http:HttpClient) { }
 
  getAllZone(){
    return this.http.get(this.zoneAPI)
  }

  addZone(body:any){
    return this.http.post(this.zoneAPI,body)
  }

  editZone(id:any,body:any){
    return this.http.put(this.zoneAPI + "/" + id,body)
  }

  getByZoneId(id:any){
    return this.http.get(this.zoneAPI + "/" + id)
  }
  editZoneStatus(id:any,body:any){
    return this.http.put(this.zoneAPI + "/" + "update-with-status" + "/" + id,body)
  }
}
