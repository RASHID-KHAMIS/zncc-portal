import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentAPI =  environment.baseUrl + "Departments"
  constructor(private http:HttpClient) { }

  getAllDepartment(){
    return this.http.get(this.departmentAPI)
  }

  addDepartment(body:any){
    return this.http.post(this.departmentAPI,body)
  }

  editDepartment(id:any,body:any){
    return this.http.put(this.departmentAPI + "/" + id,body)
  }
}
