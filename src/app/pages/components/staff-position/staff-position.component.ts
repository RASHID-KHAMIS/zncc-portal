import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MemberStaffService } from '../../services/member-staff.service';

@Component({
  selector: 'app-staff-position',
  templateUrl: './staff-position.component.html',
  styleUrls: ['./staff-position.component.css']
})
export class StaffPositionComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'positionName','action'];
  loading: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  positionForm!:FormGroup;
  positionEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private memberStaffService:MemberStaffService){}
  ngOnInit(): void {
    this.fetchAllStaffPositions();
   this.configureForm();
   this.configureEditForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchAllStaffPositions(){
    this.memberStaffService.getAllStaffPosition().subscribe((resp:any)=>{
      this.dataSource = new MatTableDataSource(resp);
      this.loading = false;
      this.dataSource.paginator =  this.paginator,
      this.dataSource.sort = this.sort;
    })
  }

  configureForm(){
    this.positionForm = new FormGroup({
      staffPersonalPosition_name:new FormControl(null,Validators.required)
    })
  }

  configureEditForm(){
    this.positionEditForm = new FormGroup({
      staffPersonalPositionId:new FormControl(null),
      staffPersonalPosition_name:new FormControl(null)
    })
  }

  onSave(){
    const values = this.positionForm.value;
    this.memberStaffService.addStaffPosition(values).subscribe((resp:any)=>{
      this.alert()
      this.reload()
    })
  }

  onEdit(){
    const id = this.positionEditForm.value.staffPersonalPositionId;
    const values = this.positionEditForm.value;
    // console.log(values);
    this.memberStaffService.editStaffPosition(id,values).subscribe((resp:any)=>{
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
        const id = row.staffPersonalPositionId;
        row.currentStatus = '0';
        this.memberStaffService.editStaffPositionStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'Staff Position has been blocked.',
          icon: 'warning',
        });
      }
    });
 
  }

  unBlock(row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Un block this staff position!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Un block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.staffPersonalPositionId;
        row.currentStatus = 1;
        this.memberStaffService.editStaffPositionStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Un blocked!',
          text: 'Staff Position Unblocked Successfully.',
          icon: 'success',
        });
      }
    });
    
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
    this.positionEditForm = new FormGroup({
      staffPersonalPositionId:new FormControl(row.staffPersonalPositionId),
      staffPersonalPosition_name:new FormControl(row.staffPersonalPosition_name)
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

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['staff-position'])
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
      title: 'Position Added Successfully'
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
      title: 'Positin Edited Successfully'
    })
  }




}
