import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {

  profileAPI = environment.baseUrl + "profilePIctureFormMembers"
  constructor(private http:HttpClient) { }

  getAllProfilePic(){
    return this.http.get(this.profileAPI)
  }

  addProfilePic(id:any,body:any){
    return this.http.post(this.profileAPI + "/" + id,body)
  }
}
