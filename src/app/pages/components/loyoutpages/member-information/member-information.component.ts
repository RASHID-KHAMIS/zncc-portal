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

  GenderList: any[] = [
    { value: 'M', viewValue: 'Male' },
    { value: 'F', viewValue: 'Female' },
  ];


  ownerForm!:FormGroup;
  memberAccountId:any;
  loading: boolean = true;
  constructor(private router:Router,
    private dialog:MatDialog,
    private membershipService:MembershipService,
    private companyOwnershipService:CompanyOwnershipService){}
  ngOnInit(): void {
    this.configureForm();
   this.memberAccountId = localStorage.getItem('memberAccountId');
   this.fetchByMembershipId();
   this.fetchAllOwner()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllOwner(){
    this.companyOwnershipService.getAllOwnership().subscribe((resp:any)=>{
      this.dataSource = new MatTableDataSource(resp);
      this.loading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }


  memberInfo:any;
  fetchByMembershipId(){
    this.membershipService.getMembershirpsByMemberID(this.memberAccountId).subscribe((resp:any)=>{
      // console.log(resp);
      this.memberInfo = resp;
      // console.log(this.memberInfo.memberShipFormId);
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

  onSave(){
    this.ownerForm.patchValue({
      memberShipFormId : this.memberInfo.memberShipFormId
    })
    const values = this.ownerForm.value;
    // console.log(values);
    this.companyOwnershipService.addOwnership(values).subscribe((resp:any)=>{
      console.log('add');
      
    })
    
  }

}
