import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  baseUrl: any = environment.baseUrl + "businessTypes"
  businessSectorAPI = environment.baseUrl + "businessSectors";
  businessSizeAPI = environment.baseUrl + "businessSizes"
  constructor(private http: HttpClient) { }


  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, post);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }



  getAllBusinessSize(){
    return this.http.get(this.businessSizeAPI)
  }

  addBusinessSize(body:any){
    return this.http.post(this.businessSizeAPI,body)
  }

  editBusinessSize(id:any,body:any){
    return this.http.put(this.businessSizeAPI + "/" + id,body)
  }

  getAllBusinessSector(){
    return this.http.get(this.businessSectorAPI)
  }

  addBusinessSector(body:any){
    return this.http.post(this.businessSectorAPI,body)
  }
}
