import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from 'src/app/pages/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No','ZoneName', 'ZoneCode','action'];
  loading: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  zoneForm!:FormGroup;
  zoneEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
     private dialog:MatDialog,
     private zoneService:ZoneService){}
  ngOnInit(): void {
    this.fetchAllZone();
    this.configureForm();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllZone(){
    this.zoneService.getAllZone().subscribe((resp:any)=>{
      // console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
      
    })
  }

  configureForm(){
    this.zoneForm = new FormGroup({
      zoneName:new FormControl(null,Validators.required)
    })
  }

  configureEditForm(){
    this.zoneEditForm = new FormGroup({
      zoneId:new FormControl(null,Validators.required),
      zoneName:new FormControl(null,Validators.required)
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
    this.zoneEditForm = new FormGroup({
      zoneId:new FormControl(row.zoneId),
      zoneName:new FormControl(row.zoneName)
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
    const values = this.zoneForm.value;
    this.zoneService.addZone(values).subscribe((resp:any)=>{
      // console.log(resp);
      this.alert();
      this.reload()
      
    })
  }

  onEdit(){
    const id = this.zoneEditForm.value.zoneId;
    const values =this.zoneEditForm.value;
    this.zoneService.editZone(id,values).subscribe((resp:any)=>{
      this.alert2();
      this.reload()
    })
  }

  onBlock(row:any){
    // console.log(row);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this zone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.zoneId;
        row.currentStatus = '0';
        this.zoneService.editZoneStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'Zone has been blocked.',
          icon: 'warning',
        });
      }
    });
    
  }

  unBlock(row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Un block this zone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Un block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.zoneId;
        row.currentStatus = '1';
        this.zoneService.editZoneStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Un blocked!',
          text: 'Zone Unblocked Successfully.',
          icon: 'success',
        });
      }
    });
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['zone'])
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
      title: 'Zone Added Successfully'
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
      title: 'Zone Edited Successfully'
    })
  }



}
