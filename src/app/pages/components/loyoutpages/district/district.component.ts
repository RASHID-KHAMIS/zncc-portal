import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DistrictService } from 'src/app/pages/services/district.service';
import { RegionService } from 'src/app/pages/services/region.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'DistrictName','RegionName','DistrictCode','action'];
  loading: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  districtForm!:FormGroup;
  districtEditForm!:FormGroup;

  constructor(private dialog:MatDialog,
    private router:Router,
    private regionService:RegionService,
    private districtService:DistrictService){}
  ngOnInit(): void {
    this.fetchRegions();
  this.fetchAllDistricts();
  this.configForm();
  this.configEditForm();
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  regionLists:any;
  fetchRegions(){
    this.regionService.getAllRegion().subscribe((resp:any)=>{
      this.regionLists = resp;
    })
  }

  fetchAllDistricts(){
    this.districtService.getAllDistricts().subscribe((resp:any)=>{
      this.dataSource = new MatTableDataSource(resp);
      // console.log(resp);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }


  configForm(){
    this.districtForm = new FormGroup({
      districtName: new FormControl(null,Validators.required),
      regionId: new FormControl(null,Validators.required),
    })
  }

  configEditForm(){
    this.districtEditForm = new FormGroup({
      id:new FormControl(null),
      districtName: new FormControl(null,Validators.required),
      regionId: new FormControl(null,Validators.required),
    })
  }

  openDialog() {

    let dialogRef = this.dialog.open(this.distributionDialog, {
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

  openDialog2(row:any) {
    this.districtEditForm = new FormGroup({
      id:new FormControl(row.id),
      districtName: new FormControl(row.districtName),
      districtCode: new FormControl(row.districtCode),
      regionId: new FormControl(row.regionId),
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
    const values = this.districtForm.value;
    // console.log(values);
    
    this.districtService.addDistricts(values).subscribe((resp:any)=>{
      this.alert();
      this.reload()
    })
  }

  onEdit(){
    const id = this.districtEditForm.value.id;
    const values = this.districtEditForm.value;
    this.districtService.editDistricts(id,values).subscribe((resp:any)=>{
      this.alert2();
      this.reload()
    })
  }

  onBlock(row:any){
    console.log(row);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this district!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.id;
        row.currentStatus = '0';
        this.districtService.editDistrictsStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'District has been blocked.',
          icon: 'warning',
        });
      }
    });
    
  }

  unBlock(row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Un block this district!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Un block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.id;
        row.currentStatus = 1;
        this.districtService.editDistrictsStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Un blocked!',
          text: 'District Unblocked Successfully.',
          icon: 'success',
        });
      }
    });
    
  }
  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['district'])
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
      title: 'District Added Successfully'
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
      title: 'District Edited Successfully'
    })
  }

}
