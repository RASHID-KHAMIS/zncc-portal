import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  membershipAPI = environment.baseUrl + "MemberShipForms"
  constructor(private http:HttpClient) { }

  getAllMembership(){
    return this.http.get(this.membershipAPI)
  }

  addMembership(body:any){
    return this.http.post(this.membershipAPI,body)
  }

  editMembership(id:any,body:any){
    return this.http.put(this.membershipAPI + "/" + id,body)
  }

  getMembershirpsByMemberID(id:any){
    return this.http.get(this.membershipAPI + "/" + "with-account-id" + "/" + id)
  }
}
