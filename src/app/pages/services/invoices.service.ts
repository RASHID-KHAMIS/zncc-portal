import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {


  invoiceAPI = environment.baseUrl + "Invoices"
  fileInvoiceAPI = environment.baseUrl + "fileInvoices"
  constructor(private http:HttpClient) { }

  getAllInvoice(){
    return this.http.get(this.invoiceAPI)
  }

  getInvoiceByFormId(id:any){
    return this.http.get(this.invoiceAPI + "/" + "get-by" + "/" + id)
  }

  addFileInvoices(body:any){
    return this.http.post(this.fileInvoiceAPI,body)
  }

  getFileInvoiceByInvoiceId(id:any){
    return this.http.get(this.fileInvoiceAPI + "/" + "with-invoice" + "/" + id)
  }

  editInvoiceStatus(id:any,body:any){
    return this.http.put(this.invoiceAPI + "/" + "updatePaymentStatus" + "/" + id,body)
  }
}
