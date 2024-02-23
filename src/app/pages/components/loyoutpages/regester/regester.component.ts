import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import { DistrictService } from 'src/app/pages/services/district.service';
import { MembershipService } from 'src/app/pages/services/membership.service';
import { MemberService } from 'src/app/pages/services/membersservice/member.service';
import { RegionService } from 'src/app/pages/services/region.service';
import Swal from 'sweetalert2';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.css']
})
export class RegesterComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'order_number', 'company_id', 'paper_id', 'quantity', 'action'];
  memberForm!: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;
  selectedFile!: ImageSnippet;
  preview = './../../../../../assets/avata.png';
  isSoleProprietorship: boolean = false
  progress = 0;
  message = '';


  imageInfos?: Observable<any>;
  memberAccountId:any;
  constructor(private fb: FormBuilder, 
    private router:Router,
    private memberService: MemberService,
    private regionService:RegionService,
    private districtService:DistrictService,
    private businessService:BusinessService,
    private membershipService:MembershipService) { }

  ngOnInit(): void {
    this.memberAccountId = localStorage.getItem('memberAccountId'),
    this.initForm();
    this.fetchAllRegion();
    this.fetchAllDistrict();
    this.fetchBusinessSector();

  }

    // Function to handle radio button click
    onRadioButtonClick(value: any) {
      console.log(value);
      this.memberForm.patchValue({
        membership_type:value
      })
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
      }

      this.selectedFiles = undefined;
    }
  }

  initForm() {
    this.memberForm = new FormGroup({
      company_name:new FormControl('', Validators.required),
      company_email:new FormControl('', [Validators.required, Validators.email]),
      company_phone:new FormControl(''),
      representative_phone:new FormControl(''),
      regionId: new FormControl(''),
      districtId: new FormControl(''),
      membership_type: new FormControl(''),
      owner_name: new FormControl(''),
      owner_email: new FormControl(''),
      owner_phone: new FormControl(''),
      representative_name: new FormControl(''),
      gender: new FormControl(''),
      position: new FormControl(''),
      representative_email: new FormControl(''),
      businessSectorId: new FormControl(''),
      TRA_number: new FormControl(''),
      company_certificate_number:new FormControl(''),
      upload_BPRA: new FormControl(''),
      representative_CV: new FormControl(''),
      memberAccountId:new FormControl(this.memberAccountId)
    });
  }

  regionList:any;
  fetchAllRegion(){
    this.regionService.getAllRegion().subscribe((resp:any)=>{
      this.regionList = resp;
    })
  }

  districtList:any;
  fetchAllDistrict(){
    this.districtService.getAllDistricts().subscribe((resp:any)=>{
      // console.log(resp);
      this.districtList = resp;
    })
  }

  sectorLists:any;
  fetchBusinessSector(){
    this.businessService.getAllBusinessSector().subscribe((resp:any)=>{
      this.sectorLists = resp;
    })
  }
  
  submit() {
    const values = this.memberForm.value;
    this.membershipService.addMembership(values).subscribe((resp:any)=>{
      // console.log('added');
      this.alert();
      this.reload()
      
    })
  }

  succeAlart() {
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
      title: 'Signed in successfully'
    })
  }
  invalidAlart() {
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
      icon: 'error',
      title: 'Invalid Email Or Password'
    })
  }
  failedAlert() {
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
      icon: 'error',
      title: 'Un Authorized'
    })
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['members'])
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
      title: 'Member Added Successfully'
    })
  }
}
