import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatHint } from '@angular/material/form-field';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyOwnershipService {
ownershipAPI = environment.baseUrl + "CompanyOwnerInformations"
  constructor(private http:HttpClient) { }

  getAllOwnership(){
    return this.http.get(this.ownershipAPI)
  }

  addOwnership(body:any){
    return this.http.post(this.ownershipAPI,body)
  }

  editOwnership(id:any,body:any){
    return this.http.put(this.ownershipAPI + "/" + id,body)
  }
  getByMembershipId(id:any){
    return this.http.get(this.ownershipAPI + "/" + "with-membership" + "/" + id )
  }
}
