import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberStaffService {

  staffAPI = environment.baseUrl + "StaffPersonalInfos"
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
}
