import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessSubSectorService {

  businessSuSectorAPI = environment.baseUrl + "businessSubSectors"
  constructor(private http:HttpClient) { }

  getAllBusinessSubSector(){
    return this.http.get(this.businessSuSectorAPI)
  }

  addBusinessSubSector(body:any){
    return this.http.post(this.businessSuSectorAPI,body)
  }


  editBusinessSubSector(id:any,body:any){
    return this.http.put(this.businessSuSectorAPI + "/" + id,body)
  }

  getSubSectorBySectorID(id:any){
    return this.http.get(this.businessSuSectorAPI + "/" + "with-businessSector" + "/" + id)
  }
}
