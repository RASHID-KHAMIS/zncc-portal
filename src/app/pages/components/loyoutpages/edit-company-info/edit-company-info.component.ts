import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import { DistrictService } from 'src/app/pages/services/district.service';
import { MembershipUploadService } from 'src/app/pages/services/membership-upload.service';
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
  selector: 'app-edit-company-info',
  templateUrl: './edit-company-info.component.html',
  styleUrls: ['./edit-company-info.component.css']
})
export class EditCompanyInfoComponent implements OnInit{
  memberForm!: FormGroup;
  isSoleProprietorship: boolean = false
  memberAccountId:any;
  loading:boolean = true;


  constructor(private fb: FormBuilder, 
    private router:Router,
    private route:ActivatedRoute,
    private memberService: MemberService,
    private regionService:RegionService,
    private districtService:DistrictService,
    private businessService:BusinessService,
    private membershipService:MembershipService){}
  ngOnInit(): void {
    const member = this.route.snapshot.queryParamMap.get('id');
    // console.log(member);
    this.fetchMemberById(member);
    this.memberAccountId = localStorage.getItem('memberAccountId'),
    this.initForm();
    this.fetchAllRegion();
    this.fetchAllDistrict();
    this.fetchBusinessSector();
   
  }

  fetchMemberById(id:any){
    this.membershipService.getMembershipFormById(id).subscribe((resp:any)=>{
      // console.log(resp);
      this.memberForm = new FormGroup({
        memberShipFormId:new FormControl(resp.memberShipFormId),
        company_name:new FormControl(resp.company_name),
        company_email:new FormControl(resp.company_email),
        company_phone:new FormControl(resp.company_phone),
        representative_phone:new FormControl(resp.representative_phone),
        regionId: new FormControl(resp.regionId),
        districtId: new FormControl(resp.districtId),
        membership_type: new FormControl(resp.membership_type),
        owner_name: new FormControl(resp.owner_name),
        owner_email: new FormControl(resp.owner_email),
        owner_phone: new FormControl(resp.owner_phone),
        representative_name: new FormControl(resp.representative_name),
        gender: new FormControl(resp.gender),
        position: new FormControl(resp.position),
        representative_email: new FormControl(resp.representative_email),
        businessSectorId: new FormControl(resp.businessSectorId),
        TRA_number: new FormControl(resp.TRA_number),
        company_certificate_number:new FormControl(resp.company_certificate_number),
        street: new FormControl(resp.street),
        businessActivity: new FormControl(resp.businessActivity),
        numberOfStaf:new FormControl(resp.numberOfStaf),
      });
      
    })
  }

    onRadioButtonClick(value: any) {
      console.log(value);
      this.memberForm.patchValue({
        membership_type:value
      })
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
      street: new FormControl(''),
      businessActivity: new FormControl(''),
      numberOfStaf:new FormControl('', Validators.required),
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
 
  onEdit(){
    const id = this.memberForm.value.memberShipFormId;
    const values = this.memberForm.value;
    // console.log(id);
    this.membershipService.editMembership(id,values).subscribe((resp:any)=>{
      this.alert();
      this.reload();
      
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
      title: 'Information Edited'
    })
  }

  onBack(){
    this.router.navigate(['home'])
  }

  

}
