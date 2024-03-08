import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipCommentsService {

  commentAPI = environment.baseUrl + "MemberShipComments"
  constructor(private http:HttpClient) { }


  getAllComments(){
    return this.http.get(this.commentAPI)
  }

  addComments(body:any){
    return this.http.post(this.commentAPI,body)
  }

  editComments(id:any,body:any){
    return this.http.put(this.commentAPI + "/" + id,body)
  }

  getCommentsById(id:any){
    return this.http.get(this.commentAPI + "/" + id)
  }

  getCommentsByMemberFormId(id:any){
    return this.http.get(this.commentAPI + "/" + "with-membership" + "/" + id)
  }
}
