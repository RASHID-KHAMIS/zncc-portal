import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberStaffService {

  staffAPI = environment.baseUrl + "StaffPersonalInfos"

  staffPositionAPI = environment.baseUrl + "StaffPersonalPositions"
  constructor(private http:HttpClient) { }

  getAllStaff(){
    return this.http.get(this.staffAPI)
  }

  addStaff(body:any){
    return this.http.post(this.staffAPI,body)
  }

  editStaff(id:any,body:any){
    return this.http.put(this.staffAPI + "/" + id,body)
  }

  getStaffById(id:any){
    return this.http.get(this.staffAPI + "/" + id)
  }


  getAllStaffPosition(){
    return this.http.get(this.staffPositionAPI)
  }

  addStaffPosition(body:any){
    return this.http.post(this.staffPositionAPI,body)
  }

  editStaffPosition(id:any,body:any){
    return this.http.put(this.staffPositionAPI + "/" + id,body)
  }
}
