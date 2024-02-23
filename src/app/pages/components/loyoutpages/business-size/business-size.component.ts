import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-size',
  templateUrl: './business-size.component.html',
  styleUrls: ['./business-size.component.css']
})
export class BusinessSizeComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'businessName', 'amountToPay','distriction','status','action'];
  loading: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  sizeForm!:FormGroup;
  sizeEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private businessService:BusinessService){}
  ngOnInit(): void {

    this.configureForm();
    this.fetchAllBusinessSize();
 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllBusinessSize(){
    this.businessService.getAllBusinessSize().subscribe((resp:any)=>{
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  configureForm(){
    this.sizeForm = new FormGroup({
      businessName: new FormControl(null,Validators.required),
      amountToPay: new FormControl(null,Validators.required),
      distriction: new FormControl(null),
    })
  }

  configureEditForm(){
    this.sizeEditForm = new FormGroup({
      businessSizeId:new FormControl(null),
      businessName: new FormControl(null,Validators.required),
      amountToPay: new FormControl(null,Validators.required),
      distriction: new FormControl(null),
    })
  }


  openDialog() {
    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = 'Y';
        } else if (result === 'no') {
        }
      }
    });
  }

  openDialog2(row:any) {
    this.sizeEditForm = new FormGroup({
      businessSizeId:new FormControl(row.businessSizeId),
      businessName: new FormControl(row.businessName),
      amountToPay: new FormControl(row.amountToPay),
      distriction: new FormControl(row.distriction),
    })
    let dialogRef = this.dialog.open(this.distributionDialog2, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"

        } else if (result === 'no') {
        }
      }
    })
  }

  onSave(){
    const values = this.sizeForm.value;
    // console.log(values);
    this.businessService.addBusinessSize(values).subscribe((resp:any)=>{
      this.alert();
      this.reload();
    })
    
  }

  onEdit(){
    const id = this.sizeEditForm.value.businessSizeId;
    const values = this.sizeEditForm.value;

    this.businessService.editBusinessSize(id,values).subscribe((resp:any)=>{
      this.alert2();

      this.reload();
    })
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['business-size'])
    })
  }

  alert(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Business Size Added Successfully'
    })
  }

  alert2(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Business Size Edited Successfully'
    })
  }





}
