import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  districtAPI = environment.baseUrl + "Districts"
  constructor(private http:HttpClient) { }

  getAllDistricts(){
    return this.http.get(this.districtAPI)
  }

  addDistricts(body:any){
    return this.http.post(this.districtAPI,body)
  }

  editDistricts(id:any,body:any){
    return this.http.put(this.districtAPI + "/" + id,body)
  }
}
