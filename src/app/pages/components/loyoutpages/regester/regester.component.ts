import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessSubSectorService } from 'src/app/pages/services/business-sub-sector.service';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import { DistrictService } from 'src/app/pages/services/district.service';
import { MembershipUploadService } from 'src/app/pages/services/membership-upload.service';
import { MembershipService } from 'src/app/pages/services/membership.service';
import { MemberService } from 'src/app/pages/services/membersservice/member.service';
import { ProfilePictureService } from 'src/app/pages/services/profile-picture.service';
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
  files:any


  imageInfos?: Observable<any>;
  memberAccountId:any;
  loading:boolean = true;

  constructor(private fb: FormBuilder, 
    private router:Router,
    private memberService: MemberService,
    private regionService:RegionService,
    private districtService:DistrictService,
    private businessService:BusinessService,
    private membershipService:MembershipService,
    private membershipUploadService:MembershipUploadService,
    private profilePictureService:ProfilePictureService,
    private businessSubSectorService:BusinessSubSectorService) { }
    

  ngOnInit(): void {
    this.memberAccountId = localStorage.getItem('memberAccountId'),
    this.initForm();
    this.fetchAllRegion();
    this.fetchBusinessSector();

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
      businessSubSectorId: new FormControl(''),
      TRA_number: new FormControl(''),
      company_certificate_number:new FormControl(''),
      upload_BPRA: new FormControl('BPRA'),
      representative_CV: new FormControl('CV'),
      profile_pic: new FormControl('profile'),
      street: new FormControl(''),
      businessActivity: new FormControl(''),
      memberAccountId:new FormControl(this.memberAccountId),
      numberOfStaf:new FormControl('', Validators.required),
    });
  }

  regionList:any;
  fetchAllRegion(){
    this.regionService.getAllRegion().subscribe((resp:any)=>{
      this.regionList = resp;
    })
  }


  sectorLists:any;
  fetchBusinessSector(){
    this.businessService.getAllBusinessSector().subscribe((resp:any)=>{
      this.sectorLists = resp;
    })
  }

  subSectorLists:any
  onSector(event:any){
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.businessSubSectorService.getSubSectorBySectorID(selectedValue).subscribe((resp:any)=>{
      // console.log(resp);
      this.subSectorLists = resp
      
    })
    
  }
  

  districtList:any;
  onChange(event:any){
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.districtService.getDistrictsByRegionID(selectedValue).subscribe((resp:any)=>{
      this.districtList = resp;
    })


    
  }
  submit() {
    const values = this.memberForm.value;
    this.membershipService.addMembership(values).subscribe((resp:any)=>{
      const form = new FormData();

      form.append('file', this.files, this.files.name);
      form.append('fileCategory', values.profile_pic);
      this.profilePictureService.addProfilePic(resp.memberShipFormId,form).subscribe((resp:any)=>{
        console.log(resp);
        console.log('uploaded');
        
      })
    
      form.append('file', this.files, this.files.name);
      form.append('fileCategory', values.upload_BPRA);
      this.membershipUploadService.addFilesUpload(resp.memberShipFormId,form).subscribe((resp)=>{  
      })
        if (this.files!=null) {
          form.append('file', this.files, this.files.name);
          form.append('fileCategory', values.representative_CV);
          this.membershipUploadService.addFilesUpload(resp.memberShipFormId,form).subscribe((resp)=>{  
          })
      }
      this.alert();
      this.reload()
      
    })
  }



  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['home'])
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
