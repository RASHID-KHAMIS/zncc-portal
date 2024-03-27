import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompanyOwnershipService } from 'src/app/pages/services/company-ownership.service';
import { DashboardService } from 'src/app/pages/services/dashboard.service';
import { MembershipCommentsService } from 'src/app/pages/services/membership-comments.service';
import { MembershipUploadService } from 'src/app/pages/services/membership-upload.service';
import { MembershipService } from 'src/app/pages/services/membership.service';

import Swal from 'sweetalert2';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'owner_name','gender', 'owner_email','owner_phone','representative_name','position','action'];
  dataSource2 = new MatTableDataSource();
  displayedColumns2: string[] = ['No', 'Category', 'view','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild('distributionDialog3') distributionDialog3!: TemplateRef<any>;

  GenderList: any[] = [
    { value: 'M', viewValue: 'Male' },
    { value: 'F', viewValue: 'Female' },
  ];


  ownerForm!:FormGroup;
  ownerEditForm!:FormGroup;
  memberAccountId:any;
  loading: boolean = true;
  check:boolean = false;
  check2:boolean = false;
  checked:boolean = false
  role:any;

  selectedFiles?: FileList;
  currentFile?: File;
  selectedFile!: ImageSnippet;
  preview = './../../../../../assets/avata.png';
  isSoleProprietorship: boolean = false
  progress = 0;
  message = '';
  files:any;

  documentsForm!:FormGroup;
  checkComment:boolean=false;

  constructor(private router:Router,
    private dialog:MatDialog,
    private membershipService:MembershipService,
    private companyOwnershipService:CompanyOwnershipService,
    private membershipUploadService:MembershipUploadService,
    private membershipCommentsService:MembershipCommentsService,
    private dashboardService:DashboardService){}
  ngOnInit(): void {
    this.configureForm();
   this.memberAccountId = localStorage.getItem('memberAccountId');
  //  console.log(this.memberAccountId);
   this.fetchByMembershipId();
   this.configureEditForm();
   this.configureDocumentsForm();
   this.fetchCompanyByMemberAccount()

   this.role = localStorage.getItem('role');
   this.dashboardInformation()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  comment:any;
  memberInfo:any;
  fetchByMembershipId(){
    this.membershipService.getMembershirpsByMemberID(this.memberAccountId).subscribe((resp:any)=>{

      this.memberInfo = resp;
      // console.log(this.memberInfo);
      if (this.memberInfo !== undefined || this.memberInfo.length > 0) {
        this.checked = true;
      }

      this.membershipCommentsService.getCommentsByMemberFormId(this.memberInfo.memberShipFormId).subscribe((resp:any)=>{
        // console.log(resp.memberShipCommentId.length); 
        if (resp.memberShipCommentId.length > 0) {
          this.checkComment = true;
        }
        
        this.comment = resp.comment_resone; 
      })
      
      // console.log(this.memberInfo.memberShipFormId);

         this.membershipUploadService.getPictureById(this.memberInfo.memberShipFormId).subscribe((resp:any)=>{
      // console.log(resp);

      if (resp.length > 0) {
        this.check2 = true;
      }
      this.dataSource2 = new MatTableDataSource(resp);
      this.loading = false;
    
    })

      this.companyOwnershipService.getByMembershipId(this.memberInfo.memberShipFormId).subscribe((resp:any)=>{
        // console.log(resp);
        if(resp.length > 0){
          this.check = true;
        }
        this.dataSource = new MatTableDataSource(resp);
        this.loading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
    })
  }

  companyList:any
  fetchCompanyByMemberAccount(){
    this.membershipService.getAllCompanyByMemberID(this.memberAccountId).subscribe((resp:any)=>{
      // console.log(resp);
      this.companyList = resp
      
    })

  }

  onSelectCompany(event:any){
  
      this.memberInfo = event.value;
         this.membershipUploadService.getPictureById(this.memberInfo.memberShipFormId).subscribe((resp:any)=>{
      // console.log(resp);

      if (resp.length > 0) {
        this.check2 = true;
      }
      this.dataSource2 = new MatTableDataSource(resp);
      this.loading = false;
    
    })

      this.companyOwnershipService.getByMembershipId(this.memberInfo.memberShipFormId).subscribe((resp:any)=>{
        // console.log(resp);
        if(resp.length > 0){
          this.check = true;
        }
        this.dataSource = new MatTableDataSource(resp);
        this.loading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
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

  onEditInfo(data:any){
    // console.log(data);
    this.router.navigate(['/edit-company-info'], {queryParams: { id: data.memberShipFormId }});
    
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

  processFile(imageInput: any) {
    this.loading = true;
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.files = file;
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.loading = false;
    });

    reader.readAsDataURL(file);
  }

  processFile2(imageInput: any) {
    this.loading = true;
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.files = file;
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.loading = false;
    });

    reader.readAsDataURL(file);
  }


  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  configureDocumentsForm(){
    this.documentsForm = new FormGroup({
      upload_BPRA: new FormControl('BPRA'),
      representative_CV: new FormControl('CV'),
      memberShipFormId:new FormControl(null)
    })
  }

  onSubmit() {
    this.documentsForm.patchValue({
      memberShipFormId : this.memberInfo.memberShipFormId
    })
    const values = this.documentsForm.value;
    const id = values.memberShipFormId;

      const form = new FormData();
      form.append('file', this.files, this.files.name);
      form.append('fileCategory', values.upload_BPRA);
      form.append('file', this.files, this.files.name);
      form.append('fileCategory', values.representative_CV);
      this.membershipUploadService.addFilesUpload(id,form).subscribe((resp)=>{  
        this.alert3();
        this.reload2()
      })
  }

  reload2(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['home'])
    })
  }

  alert3(){
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
      title: 'Documents Added Successfully'
    })
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

  editDocument(row:any){
    // console.log(row);
 
    
    let dialogRef = this.dialog.open(this.distributionDialog3, {
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

  information:any;
  dashboardInformation(){
    this.dashboardService.getDshboardInfo().subscribe((resp:any)=>{
      this.information = resp;  
    })
  }




}
