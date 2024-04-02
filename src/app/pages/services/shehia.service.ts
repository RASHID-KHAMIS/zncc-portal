import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShehiaService {

  shehiaAPI = environment.baseUrl + "Shehia"
  constructor(private http:HttpClient) { }

  getAllShehia(){
    return this.http.get(this.shehiaAPI)
  }

  addShehia(body:any){
    return this.http.post(this.shehiaAPI,body)
  }

  editShehia(id:any,body:any){
    return this.http.put(this.shehiaAPI + "/" + id,body)
  }

  editShehiaStatus(id:any,body:any){
    return this.http.put(this.shehiaAPI + "/" + "update-with-status" + "/" + id,body)
  }

  getShehiaByDistrictID(id:any){
    return this.http.get(this.shehiaAPI + "/" + "by-district" + "/" +id)
  }

}
