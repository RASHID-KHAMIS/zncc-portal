import { HtmlParser } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompanyOwnershipService } from 'src/app/pages/services/company-ownership.service';
import { MembershipService } from 'src/app/pages/services/membership.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-information',
  templateUrl: './member-information.component.html',
  styleUrls: ['./member-information.component.css']
})
export class MemberInformationComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'owner_name', 'owner_email','owner_phone','representative_name','position','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;

  GenderList: any[] = [
    { value: 'M', viewValue: 'Male' },
    { value: 'F', viewValue: 'Female' },
  ];


  ownerForm!:FormGroup;
  ownerEditForm!:FormGroup;
  memberAccountId:any;
  loading: boolean = true;
  check:boolean = false;
  constructor(private router:Router,
    private dialog:MatDialog,
    private membershipService:MembershipService,
    private companyOwnershipService:CompanyOwnershipService){}
  ngOnInit(): void {
    this.configureForm();
   this.memberAccountId = localStorage.getItem('memberAccountId');
   this.fetchByMembershipId();
   this.configureEditForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  memberInfo:any;
  fetchByMembershipId(){
    this.membershipService.getMembershirpsByMemberID(this.memberAccountId).subscribe((resp:any)=>{
      this.memberInfo = resp;
      // console.log(this.memberInfo.memberShipFormId);


      this.companyOwnershipService.getByMembershipId(this.memberInfo.memberShipFormId).subscribe((resp:any)=>{
        // console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.loading = false;
        this.check = true;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
    })
  }

  configureForm(){
    this.ownerForm = new FormGroup({
      owner_name: new FormControl(null,Validators.required),
      owner_email:  new FormControl(null,Validators.required),
      owner_phone:  new FormControl(null,Validators.required),
      representative_name:  new FormControl(null,Validators.required),
      gender: new FormControl(null,Validators.required),
      position:  new FormControl(null,Validators.required),
      memberShipFormId:new FormControl(null)
    })
  }

  configureEditForm(){
    this.ownerForm = new FormGroup({
      companyOwnerInformationId:new FormControl(null),
      owner_name: new FormControl(null,Validators.required),
      owner_email:  new FormControl(null,Validators.required),
      owner_phone:  new FormControl(null,Validators.required),
      representative_name:  new FormControl(null,Validators.required),
      gender: new FormControl(null,Validators.required),
      position:  new FormControl(null,Validators.required),
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
    console.log(row);
    this.ownerEditForm = new FormGroup({
      companyOwnerInformationId:new FormControl(row.companyOwnerInformationId),
      owner_name: new FormControl(row.owner_name),
      owner_email:  new FormControl(row.owner_email),
      owner_phone:  new FormControl(row.owner_phone),
      representative_name:  new FormControl(row.representative_name),
      gender: new FormControl(row.gender),
      position:  new FormControl(row.position),
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
    this.ownerForm.patchValue({
      memberShipFormId : this.memberInfo.memberShipFormId
    })
    const values = this.ownerForm.value;
    this.companyOwnershipService.addOwnership(values).subscribe((resp:any)=>{
      this.alert();
      this.reload()
      
    })
    
  }

  onEdit(){
    const id = this.ownerEditForm.value.companyOwnerInformationId;
    const values = this.ownerEditForm.value;
    this.companyOwnershipService.editOwnership(id,values).subscribe((resp:any)=>{
      this.alert2();
      this.reload();
    })
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['memberInfor'])
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
      title: 'Owner Added Successfully'
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
      title: 'Owner Edited Successfully'
    })
  }


}
