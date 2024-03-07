import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/pages/services/department.service';
import { DistrictService } from 'src/app/pages/services/district.service';
import { MemberStaffService } from 'src/app/pages/services/member-staff.service';
import { StaffsService } from 'src/app/pages/services/membersservice/staffs.service';
import { RegionService } from 'src/app/pages/services/region.service';
import { ShehiaService } from 'src/app/pages/services/shehia.service';
import { ZoneService } from 'src/app/pages/services/zone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit{

  staffEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private zoneService:ZoneService,
    private regionService:RegionService,
    private districtService:DistrictService,
    private shehiaService:ShehiaService,
    private departmentService:DepartmentService,
    private memberStaffService:MemberStaffService){}
  ngOnInit(): void {
    const staff = this.route.snapshot.queryParamMap.get('id');
    // console.log(staff);
    this.fetchStaffById(staff)
    
    this.initForm();
    this.fetchAllZone();
    this.fetchAllRegion();
    this.fetchAllDistricts();
    this.fetchAllShehia();
    this.fetchAllDepartment();
    this.fetchStaffPosition();

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

  districtList:any;
  fetchAllDistricts(){
    this.districtService.getAllDistricts().subscribe((resp:any)=>{
      this.districtList = resp;     
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
    
    this.staffEditForm = new FormGroup({
      id:new FormControl(null),
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
    });
  }

  fetchStaffById(staff:any){
    this.memberStaffService.getStaffById(staff).subscribe((resp:any)=>{
      // console.log(resp);
      
      this.staffEditForm = new FormGroup({
        id:new FormControl(resp.id),
        regNo: new FormControl(resp.regNo),
        firstName:new FormControl(resp.firstName),
        middleName: new FormControl(resp.middleName),
        lastName: new FormControl(resp.lastName),
        dob: new FormControl(resp.dob),
        gender:new FormControl(resp.gender),
        maritalStatus:new FormControl(resp.maritalStatus),
        physicalAddress: new FormControl(resp.physicalAddress),
        isResidence: new FormControl(resp.isResidence),
        zoneId: new FormControl(resp.zoneId),
        phoneNumber:new FormControl(resp.phoneNumber),
        isStaffHaveDisability:new FormControl(resp.isStaffHaveDisability), 
        regionId: new FormControl(resp.regionId),
        districtId: new FormControl(resp.districtId),
        shehiaId: new FormControl(resp.shehiaId),
        streetName: new FormControl(resp.streetName),
        postCode: new FormControl(resp.postCode),
        houseNo:new FormControl(resp.houseNo),
        terminationStatus: new FormControl(resp.terminationStatus),
        email:new FormControl(resp.email),
        workPhone: new FormControl(resp.workPhone),
        workEmail: new FormControl(resp.workEmail),
        bankName:new FormControl(resp.bankName),
        accountNumber: new FormControl(resp.accountNumber),
        departmentId: new FormControl(resp.departmentId),
        staffPosition: new FormControl(resp.staffPosition),
        personalId: new FormControl(resp.personalId),
  
      });
      
    })
  }

  submit(){
    const values = this.staffEditForm.value;
    const id = this.staffEditForm.value.id
    // console.log(values);
    this.memberStaffService.editStaff(id,values).subscribe((resp:any)=>{
      // console.log(resp);
      this.alert();
      this.reload();
      
    })
    
  }

  onBack(){
    this.router.navigate(['staff-info'])
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
      title: 'Staff Edited'
    })
  }


}
