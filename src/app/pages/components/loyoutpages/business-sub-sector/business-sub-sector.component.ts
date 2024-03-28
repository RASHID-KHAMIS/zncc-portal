import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessSubSectorService } from 'src/app/pages/services/business-sub-sector.service';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-sub-sector',
  templateUrl: './business-sub-sector.component.html',
  styleUrls: ['./business-sub-sector.component.css']
})
export class BusinessSubSectorComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id','subSectorName','sectorName','sectorCode','status','action'];
  loding = true;
  @ViewChild('callDialog') callDialog!: TemplateRef<any>;
  @ViewChild('callDialog2') callDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  businessSubSectorForm!:FormGroup;
  businessSubSectorEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private businessService:BusinessService,
    private businessSubSectorService:BusinessSubSectorService){}
  ngOnInit(): void {
    this.configureForm();
    this.configureEditForm();
    this.fetchAllBusinessSector();
    this.fetchAllBusinessSubSector();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sector:any;
  fetchAllBusinessSector() {
    this.businessService.getAllBusinessSector().subscribe((resp: any) => {
      this.sector = resp
      })
  }

  fetchAllBusinessSubSector(){
    this.businessSubSectorService.getAllBusinessSubSector().subscribe((resp:any)=>{
      // console.log(resp);
      this.loding = false
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
    this.businessSubSectorEditForm = new FormGroup({
      businessSubSectorId:new FormControl(row.businessSubSectorId),
      sectorName:new FormControl(row.sectorName),
      subsectorName:new FormControl(row.subsectorName),
      sectorCode:new FormControl(row.sectorCode),
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

  configureForm(){
    this.businessSubSectorForm = new FormGroup({
      businessSectorId:new FormControl(null,Validators.required),
      sectorName:new FormControl(null,Validators.required),
      sectorCode:new FormControl(null),
      currentStatus:new FormControl(1),
    })
  
  }

  configureEditForm(){
    this.businessSubSectorEditForm = new FormGroup({
      businessSubSectorId:new FormControl(null),
      businessSectorId:new FormControl(null,Validators.required),
      sectorName:new FormControl(null,Validators.required),
      sectorCode:new FormControl(null),
      currentStatus:new FormControl(1),
    })
  
  }

  submit(){
    const values = this.businessSubSectorForm.value;
    // console.log(values);
    this.businessSubSectorService.addBusinessSubSector(values).subscribe((resp:any)=>{
      this.reload();
      this.alert()
    })
  }

  onEdit(){
    const id = this.businessSubSectorEditForm.value.businessSubSectorId;
    const values = this.businessSubSectorEditForm.value;
    console.log(id);
    console.log(values);
    
    

    // this.businessSubSectorService.editBusinessSubSector(id,values).subscribe((resp:any)=>{
    //   this.reload();
    //   this.alert2()
    // })
  }


  onBlock(row:any){
    // console.log(row);
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this Sub Sector!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.businessSubSectorId;
        row.currentStatus = '0';
        this.businessSubSectorService.editBusinessSubSectorStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'Sub Sector has been blocked.',
          icon: 'warning',
        });
      }
    });
    
  }

  unBlock(row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this Sub Sector!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.businessSubSectorId;
        row.currentStatus = '1';
        this.businessSubSectorService.editBusinessSubSectorStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Un blocked!',
          text: 'Sub Sector has been blocked.',
          icon: 'success',
        });
      }
    });
  }


  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['business-sub-sector'])
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
