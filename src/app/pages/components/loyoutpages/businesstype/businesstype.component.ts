import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-businesstype',
  templateUrl: './businesstype.component.html',
  styleUrls: ['./businesstype.component.css']
})
export class BusinesstypeComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id','sectorName','sectorCode','status','action'];
  loding = true;
  @ViewChild('callDialog') callDialog!: TemplateRef<any>;
  @ViewChild('callDialog2') callDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  businesSectorForm!: FormGroup;
  businesSectorEditForm!: FormGroup;
  constructor(private businessService: BusinessService, 
    public dialog: MatDialog,
    private router:Router,) {

  }
  ngOnInit(): void {
    this.getAllBusinessSector()
    this.createForm();
    this.configureEditForm()
  }

  createForm() {
    this.businesSectorForm = new FormGroup({
      sectorCode: new FormControl(null,Validators.required),
      sectorName: new FormControl(null,Validators.required)
    })
  }

  configureEditForm() {
    this.businesSectorEditForm = new FormGroup({
      businessSectorId: new FormControl(null),
      sectorCode: new FormControl(null,Validators.required),
      sectorName: new FormControl(null,Validators.required)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialgOpen() {
    let dialogRef = this.dialog.open(this.callDialog, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"
          // console.log(result);
        } else if (result === 'no') {
          // console.log('User clicked no.');
        }
      }
    })
  }

  dialgOpen2(row:any) {
    // console.log(row);
    this.businesSectorEditForm = new FormGroup({
      businessSectorId: new FormControl(row.businessSectorId),
      sectorCode: new FormControl(row.sectorCode),
      sectorName: new FormControl(row.sectorName)
    })
    
    let dialogRef = this.dialog.open(this.callDialog2, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"
          // console.log(result);
        } else if (result === 'no') {
          // console.log('User clicked no.');
        }
      }
    })
  }


  getAllBusinessSector() {
    this.businessService.getAllBusinessSector().subscribe((resp: any) => {
        this.loding = false
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  submit() {
    const values = this.businesSectorForm.value;
    // console.log(values);
    
    this.businessService.addBusinessSector(values).subscribe((resp:any)=>{
      this.alert();
      this.reload()
    })
  }

  onEdit(){
    const id = this.businesSectorEditForm.value.businessSectorId;
    const values = this.businesSectorEditForm.value;
    this.businessService.editBusinessSector(id,values).subscribe((resp:any)=>{
      this.alert2();
      this.reload()
    })

  }


  onBlock(row:any){
    // console.log(row);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this business sector!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.businessSectorId;
        row.currentStatus = '0';
        this.businessService.editBusinessSectorStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'Business sector has been blocked.',
          icon: 'warning',
        });
      }
    });
    
  }

  unBlock(row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this business sector!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.businessSectorId;
        row.currentStatus = '1';
        this.businessService.editBusinessSectorStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'Business sector has been blocked.',
          icon: 'success',
        });
      }
    });
  }


  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['business-type'])
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
      title: 'Business Sector Added Successfully'
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
      title: 'Business Sector Edited'
    })
  }

}
