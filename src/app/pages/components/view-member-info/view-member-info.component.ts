import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipService } from '../../services/membership.service';
import { BusinessService } from '../../services/bussnessservices/business.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-member-info',
  templateUrl: './view-member-info.component.html',
  styleUrls: ['./view-member-info.component.css']
})
export class ViewMemberInfoComponent implements OnInit{
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;

  verifyForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private membershipService:MembershipService,
    private businessService:BusinessService,
    private dialog:MatDialog){}
  ngOnInit(): void {
    this.fetchAllBusinessSize();
    this.configureForm();

    const member = this.route.snapshot.queryParamMap.get('id');
    // console.log(member);
    this.fetchMemberByID(member)
  
  }

  sizeList:any;
  fetchAllBusinessSize(){
    this.businessService.getAllBusinessSize().subscribe((resp:any)=>{
      this.sizeList =resp;
      // console.log(resp);
      
    })
  }

  memberInfo:any;
  fetchMemberByID(memberId:any){
    this.membershipService.getByMemberId(memberId).subscribe((resp:any)=>{
      // console.log(resp);
      this.memberInfo = resp;
      
      this.verifyForm = new FormGroup({
        businessSizeId: new FormControl(null,Validators.required),
        memberShipFormId: new FormControl(this.memberInfo.memberShipFormId),
      })
    })
  }
  configureForm(){
    this.verifyForm = new FormGroup({
      businessSizeId: new FormControl(null,Validators.required),
      memberShipFormId: new FormControl(this.memberInfo?.memberShipFormId),
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
    const values = this.verifyForm.value;
    // console.log(values);
    this.membershipService.verify(values).subscribe((resp:any)=>{
      // console.log('verified');
      this.alert()
      
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
      title: 'Verified Successfully'
    })
  }


}
