import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RegionService } from 'src/app/pages/services/region.service';
import { ZoneService } from 'src/app/pages/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'RegionName','ZoneName','RegionCode','action'];
  loading: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  regionForm!:FormGroup;
  regionEditForm!:FormGroup;
  constructor(private dialog:MatDialog,
    private router:Router,
    private zoneService:ZoneService,
    private regionService:RegionService){}
  ngOnInit(): void {
    this.fetchAllZone();
    this.configureForm();
    this.fetchAllRegion();
    this.configureEditForm()
  
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchAllRegion(){
    this.regionService.getAllRegion().subscribe((resp:any)=>{
      // console.log(resp);

      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
      
    })
  }

  zoneList:any;
  fetchAllZone(){
    this.zoneService.getAllZone().subscribe((resp:any)=>{
      this.zoneList = resp;
    })
  }

  configureForm(){
    this.regionForm = new FormGroup({
      zoneId:new FormControl(null,Validators.required),
      regionName:new FormControl(null,Validators.required)
    })
  }

  configureEditForm(){
    this.regionEditForm = new FormGroup({
      regionId:new FormControl(null),
      zoneId:new FormControl(null,Validators.required),
      regionName:new FormControl(null,Validators.required)
    })
  }

  onSave(){
    const values = this.regionForm.value;
    this.regionService.addRegion(values).subscribe((resp:any)=>{
      this.alert();
      this.reload();
      
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
    // console.log(row.regionCode);
    this.regionEditForm = new FormGroup({
      zoneId:new FormControl(row.zoneId),
      regionId:new FormControl(row.regionId),
      regionName:new FormControl(row.regionName)
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

  onEdit(){
    const id = this.regionEditForm.value.regionId;
    const values = this.regionEditForm.value;
    // console.log(values);
    this.regionService.editRegion(id,values).subscribe((resp:any)=>{
      this.alert2();
      this.reload()
    })
    
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['region'])
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
      title: 'Region Added Successfully'
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
      title: 'Region Edited Successfully'
    })
  }

  

}
