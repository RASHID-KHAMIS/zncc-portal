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
import { InvoicesService } from '../../services/invoices.service';
import { CompanyOwnershipService } from '../../services/company-ownership.service';
import { MembershipCommentsService } from '../../services/membership-comments.service';

@Component({
  selector: 'app-view-member-info',
  templateUrl: './view-member-info.component.html',
  styleUrls: ['./view-member-info.component.css'],
})
export class ViewMemberInfoComponent implements OnInit {
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'Category', 'action'];

  dataSource2 = new MatTableDataSource();
  displayedColumns2: string[] = [
    'No',
    'invoiceNo',
    'Date',
    'Amount',
    'Status',
    'View',
    'action',
  ];

  dataSource3 = new MatTableDataSource();
  displayedColumns3: string[] = [
    'No',
    'owner_name',
    'owner_email',
    'owner_phone',
    'representative_name',
    'position',
  ];
  loading: boolean = true;
  check: boolean = false;
  check2: boolean = false;
  check3: boolean = false;

  verifyForm!: FormGroup;
  commentsForm!:FormGroup;
  role:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private membershipService: MembershipService,
    private businessService: BusinessService,
    private invoicesService: InvoicesService,
    private membershipUploadService: MembershipUploadService,
    private companyOwnershipService: CompanyOwnershipService,
    private dialog: MatDialog,
    private membershipCommentsService:MembershipCommentsService) {}
  ngOnInit(): void {
    this.role = localStorage.getItem("role")
    this.fetchAllBusinessSize();
    this.configureForm();
    this.configureCommentForm();
  

    const member = this.route.snapshot.queryParamMap.get('id');
    // console.log(member);
    this.fetchMemberByID(member);
    this.fetchPictureById(member);
    this.fetcInvoiceByMemberFormId(member);
    this.fetchCommentsByMembershipId(member);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchPictureById(member: any) {
    this.membershipUploadService.getPictureById(member).subscribe((resp: any) => {
        if (resp.length > 0) {
          this.check = true;
        }
        this.dataSource = new MatTableDataSource(resp);
        this.loading = false;
      });
  }

  openPictureDialog(member: any): void {
    console.log(member.file_path);

    const dialogRef = this.dialog.open(PictureDialogComponentComponent, {
      data: { pictureUrl: member.file_path },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openPdf(file: any) {
    if (file && file.file_path) {
      const extension = file.file_path.split('.').pop().toLowerCase();
      if (extension === 'pdf') {
        const dialogOptions =
          'width=800,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
        window.open('https://' + file.file_path, 'PDF Dialog', dialogOptions);
      } else {
        console.error('The file is not a PDF.');
      }
    } else {
      console.error('Invalid file object.');
    }
  }

  openPdf2(file: any) {
    this.invoicesService
      .getFileInvoiceByInvoiceId(file.invoiceId)
      .subscribe((resp: any) => {
        console.log(resp);

        if (resp && resp.file_path) {
          const extension = resp.file_path.split('.').pop().toLowerCase();
          if (extension === 'pdf') {
            const dialogOptions =
              'width=800,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
            window.open(
              'https://' + resp.file_path,
              'PDF Dialog',
              dialogOptions
            );
          } else {
            console.error('The file is not a PDF.');
          }
        } else {
          console.error('Invalid file object.');
        }
      });
  }

  sizeList: any;
  fetchAllBusinessSize() {
    this.businessService.getAllBusinessSize().subscribe((resp: any) => {
      this.sizeList = resp;
      // console.log(resp);
    });
  }

  fetcInvoiceByMemberFormId(id: any) {
    this.invoicesService.getInvoiceByFormId(id).subscribe((resp: any) => {
      // console.log(resp);
      if (resp.length > 0) {
        this.check2 = true;
      }
      this.dataSource2 = new MatTableDataSource(resp);
      this.loading = false;
    });
  }

  memberInfo: any;
  fetchMemberByID(memberId: any) {
    this.membershipService.getByMemberId(memberId).subscribe((resp: any) => {
      // console.log(resp);
      this.memberInfo = resp;

      this.companyOwnershipService.getByMembershipId(resp.memberShipFormId).subscribe((resp: any) => {
          // console.log(resp);
          if (resp.length > 0) {
            this.check3 = true;
          }
          this.dataSource3 = new MatTableDataSource(resp);
          this.loading = false;
        });

      this.verifyForm = new FormGroup({
        businessSizeId: new FormControl(null, Validators.required),
        memberShipFormId: new FormControl(this.memberInfo.memberShipFormId),
      });
    });
  }

  configureForm() {
    this.verifyForm = new FormGroup({
      businessSizeId: new FormControl(null, Validators.required),
      memberShipFormId: new FormControl(this.memberInfo?.memberShipFormId),
    });
  }

  configureCommentForm(){
    this.commentsForm = new FormGroup({
      comment_resone:new FormControl(null),
      memberShipFormId:new FormControl(null),
      commentedDate:new FormControl(new Date())
    })
  }

  openDialog() {
    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = 'Y';
        } else if (result === 'no') {
        }
      }
    });
  }

  onSave() {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want verify this member!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Verify!',
    }).then((result) => {
      if (result.isConfirmed) {
        const values = this.verifyForm.value;
        this.membershipService.verify(values).subscribe((resp: any) => {
        });
        Swal.fire({
          title: 'verified!',
          text: 'Member Verified Successfully.',
          icon: 'success',
        });
      }
    });

  }

  onStatus(data: any) {
    Swal.fire({
      title: 'You confirm customer payments?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const id = data.invoiceId;
        data.paymentStatus = '1';
        this.invoicesService
          .editInvoiceStatus(id, data)
          .subscribe((resp: any) => {});
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  onBack() {
    this.router.navigate(['new-Applicant']);
  }

  onBack2() {
    this.router.navigate(['members']);
  }

  openDialog2(memberInfo:any) {
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

  onComment(){
    // console.log(this.memberInfo);
    this.commentsForm.patchValue({
      memberShipFormId : this.memberInfo.memberShipFormId
    });
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want send comment to this member!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Comment!',
    }).then((result) => {
      if (result.isConfirmed) {
       
          const values = this.commentsForm.value;
          this.membershipCommentsService.addComments(values).subscribe((resp:any)=>{
          });
        Swal.fire({
          title: 'verified!',
          text: 'Comment Sent Successfully.',
          icon: 'success',
        });
      }
    });
  }


  comment:any;
  fetchCommentsByMembershipId(member:any){
    this.membershipCommentsService.getCommentsByMemberFormId(member).subscribe((resp:any)=>{
      // console.log(resp.comment_resone);  
      this.comment = resp.comment_resone; 
    })
    
  }



  alert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Verified Successfully',
    });
  }

  alert2() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Commented Successfully',
    });
  }
}
