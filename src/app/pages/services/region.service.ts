import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  regionAPI = environment.baseUrl + "Regions";
  constructor(private http:HttpClient) { }

  getAllRegion(){

    return this.http.get(this.regionAPI);
  }

  addRegion(body:any){
    return this.http.post(this.regionAPI,body)
  }

  editRegion(id:any,body:any){
    return this.http.put(this.regionAPI + "/" + id ,body)
  }
}
