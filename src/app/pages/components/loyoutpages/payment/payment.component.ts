import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicesService } from 'src/app/pages/services/invoices.service';

@Component({
  selector: 'app-root',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'invoiceNumber', 'nvoiceDate','invoiceAmount','paymentStatus'];
  loading: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  zoneForm!:FormGroup;
  zoneEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
     private invoicesService:InvoicesService){}
  ngOnInit(): void {
    this.fetchAllInvoice();
  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  fetchAllInvoice(){
    this.invoicesService.getAllInvoice().subscribe((resp:any)=>{
      // console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  onBack(){
    this.router.navigate(['home'])
  }


}