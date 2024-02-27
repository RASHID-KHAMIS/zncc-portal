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
}
