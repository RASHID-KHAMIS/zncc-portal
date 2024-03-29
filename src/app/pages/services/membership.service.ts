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

  getByMemberId(id:any){
    return this.http.get(this.membershipAPI + "/" + id)
  }

  addMembership(body:any){
    return this.http.post(this.membershipAPI,body)
  }

  editMembership(id:any,body:any){
    return this.http.put(this.membershipAPI + "/" + id,body)
  }

  getMembershipFormById(id:any){
    return this.http.get(this.membershipAPI + "/" + id)
  }

  getMembershirpsByMemberID(id:any){
    return this.http.get(this.membershipAPI + "/" + "with-account-id" + "/" + id)
  }

  verify(body:any){
    return this.http.post(this.membershipAPI +"/" + "verfyMember",body)
  }

  getMemberBySectorId(id:any){
    return this.http.get(this.membershipAPI + "/" + "bySector" + "/" + id)
  }

  getVerifiedMember(){
    return this.http.get(this.membershipAPI + "/" + "Verify" + "/")
  }

  getVerifiedMemberBySectorId(id:any){
    return this.http.get(this.membershipAPI + "/" + "bySectorVerify" + "/" +id)
  }

  getAllCompanyByMemberID(id:any){
    return this.http.get(this.membershipAPI + "/" + "with-all-account-id" + "/" + id)
  }
}
