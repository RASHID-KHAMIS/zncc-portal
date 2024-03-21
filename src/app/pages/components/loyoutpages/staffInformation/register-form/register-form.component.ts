import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/pages/services/department.service';
import { DistrictService } from 'src/app/pages/services/district.service';
import { MemberStaffService } from 'src/app/pages/services/member-staff.service';
import { StaffsService } from 'src/app/pages/services/membersservice/staffs.service';
import { RegionService } from 'src/app/pages/services/region.service';
import { ShehiaService } from 'src/app/pages/services/shehia.service';
import { ZoneService } from 'src/app/pages/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'order_number', 'company_id', 'paper_id', 'quantity', 'action'];
  staffForm!: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;

  preview = './../../../../../assets/avata.png';

  progress = 0;
  message = '';

  imageInfos?: Observable<any>;
  constructor(private router:Router,
    private staffsService: StaffsService,
    private zoneService:ZoneService,
    private regionService:RegionService,
    private districtService:DistrictService,
    private shehiaService:ShehiaService,
    private departmentService:DepartmentService,
    private memberStaffService:MemberStaffService) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchAllZone();
    this.fetchAllRegion();
    this.fetchAllShehia();
    this.fetchAllDepartment();
    this.fetchStaffPosition();
    // this.imageInfos = this.uploadService.getFiles();
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

  districtList:any;
  onChange(event:any){
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.districtService.getDistrictsByRegionID(selectedValue).subscribe((resp:any)=>{
      this.districtList = resp;
    })
  }

  zoneLists:any;
  fetchAllZone(){
    this.zoneService.getAllZone().subscribe((resp:any)=>{
      this.zoneLists = resp;
    })
  }



  regionList:any
  fetchAllRegion(){
    this.regionService.getAllRegion().subscribe((resp:any)=>{
      this.regionList = resp; 
    })
  }


  shehiaLists:any;
  fetchAllShehia(){
    this.shehiaService.getAllShehia().subscribe((resp:any)=>{
      this.shehiaLists = resp;
    })
  }

  departmentList:any;
  fetchAllDepartment(){
    this.departmentService.getAllDepartment().subscribe((resp:any)=>{
      this.departmentList = resp;
    })
  }

  positionList:any
  fetchStaffPosition(){
    this.memberStaffService.getAllStaffPosition().subscribe((resp:any)=>{
      this.positionList = resp;
    })
  }
  initForm(): void {
    
    this.staffForm = new FormGroup({
      regNo: new FormControl(null,Validators.required),
      firstName:new FormControl(null,Validators.required),
      middleName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      dob: new FormControl(null),
      gender:new FormControl(null,Validators.required),
      maritalStatus:new FormControl(null),
      physicalAddress: new FormControl(null,Validators.required),
      isResidence: new FormControl(null,Validators.required),
      zoneId: new FormControl(null,Validators.required),
      phoneNumber:new FormControl(null,Validators.required),
      isStaffHaveDisability:new FormControl(false), 
      regionId: new FormControl(null),
      districtId: new FormControl(null),
      shehiaId: new FormControl(null),
      streetName: new FormControl(null),
      postCode: new FormControl(null),
      houseNo:new FormControl(null),
      terminationStatus: new FormControl(1),
      email:new FormControl(null,Validators.email),
      workPhone: new FormControl(null),
      workEmail: new FormControl(null),
      bankName:new FormControl(null),
      accountNumber: new FormControl(null,Validators.required),
      departmentId: new FormControl(null,Validators.required),
      staffPosition: new FormControl(null,Validators.required),
      personalId: new FormControl(null),
      // religion: new FormControl(null),

    });
  }


  submit() {
    const values = this.staffForm.value;
    // console.log(values);
    this.memberStaffService.addStaff(values).subscribe((resp:any)=>{
          this.alert();
      this.reload();
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
      this.router.navigate(['staff-info'])
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
      title: 'Staff Added Successfully'
    })
  }
}
