import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  memberAPI = environment.baseUrl + "memberAccounts"
  constructor(private http: HttpClient) { }


  getAllMember() {
    return this.http.get(this.memberAPI);
  }

    addMember(body: any) {
    return this.http.post(this.memberAPI,body);
  }


}
