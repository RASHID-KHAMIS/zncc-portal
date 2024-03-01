import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {


  invoiceAPI = environment.baseUrl + "Invoices"
  constructor(private http:HttpClient) { }

  getAllInvoice(){
    return this.http.get(this.invoiceAPI)
  }
}
