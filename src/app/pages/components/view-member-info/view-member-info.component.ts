import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipService } from '../../services/membership.service';
import { BusinessService } from '../../services/bussnessservices/business.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ZoneService } from '../../services/zone.service';
import { MatTableDataSource } from '@angular/material/table';
import { MembershipUploadService } from '../../services/membership-upload.service';
import { PictureDialogComponentComponent } from '../loyoutpages/picture-dialog-component/picture-dialog-component.component';

@Component({
  selector: 'app-view-member-info',
  templateUrl: './view-member-info.component.html',
  styleUrls: ['./view-member-info.component.css']
})
export class ViewMemberInfoComponent implements OnInit{
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'Category','action'];
  loading: boolean = true;
  check:boolean = false;


  verifyForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private membershipService:MembershipService,
    private businessService:BusinessService,
    private zoneService:ZoneService,
    private membershipUploadService:MembershipUploadService,
    private dialog:MatDialog){}
  ngOnInit(): void {
    this.fetchAllBusinessSize();
    this.configureForm();

    const member = this.route.snapshot.queryParamMap.get('id');
    // console.log(member);
    this.fetchMemberByID(member)
    this.fetchPictureById(member)
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  fetchPictureById(member:any){
    this.membershipUploadService.getPictureById(member).subscribe((resp:any)=>{

      this.dataSource = new MatTableDataSource(resp);
      this.check = true;
      this.loading = false;
    })
  }

  openPictureDialog(member: any): void {
    console.log(member.file_path);
    
    const dialogRef = this.dialog.open(PictureDialogComponentComponent, {
      data: { pictureUrl: member.file_path } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openPdf(file: any) {
    // if (file && file.file_path) {
    //   const extension = file.file_path.split('.').pop().toLowerCase();
    //   if (extension === 'pdf') {
    //     window.open('https://'+file.file_path, '_blank');
    //   } else {
    //     console.error('The file is not a PDF.');
    //   }
    // } else {
    //   console.error('Invalid file object.');
    // }

    if (file && file.file_path) {
      const extension = file.file_path.split('.').pop().toLowerCase();
      if (extension === 'pdf') {
        const dialogOptions = 'width=800,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
        window.open('https://'+file.file_path, 'PDF Dialog', dialogOptions);
      } else {
        console.error('The file is not a PDF.');
      }
    } else {
      console.error('Invalid file object.');
    }
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

  onBack(){
    this.router.navigate(['new-Applicant'])
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
