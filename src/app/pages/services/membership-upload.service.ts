import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipUploadService {

  uploadAPI = environment.baseUrl + "filesUploadForMembers"
  constructor(private http:HttpClient) { }

  addFilesUpload(id:any,body:any){
   return this.http.post(this.uploadAPI + "/" + "add" + "/" + id,body) 
  }

  getPictureById(id:any){
    return this.http.get(this.uploadAPI + "/" + "get" + "/" + id)
  }
}
