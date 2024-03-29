import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userAPI = environment.baseUrl + "Users"
  constructor(private http:HttpClient) { }

  userLogin(body:any){
    return this.http.post(this.userAPI + "/" + "login",body)
  }

  userFirstLogin(id:any,body:any){
    return this.http.post(this.userAPI + "/" + "firts-changePassword" + "/" + id,body )
  }

  getAllStaff(){
    return this.http.get(this.userAPI + "/all-staff-user")
  }

  addUserStaff(body:any){
    return this.http.post(this.userAPI,body)
  }

  editUserStaff(id:any,body:any){
    return this.http.put(this.userAPI + "/" + id,body)
  }

  editUserStatus(id:any,body:any){
    return this.http.put(this.userAPI + "/" +"update-status" + "/" + id,body)
  }
}
