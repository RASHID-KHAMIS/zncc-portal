import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberStaffService } from 'src/app/pages/services/member-staff.service';

@Component({
  selector: 'app-view-staff-info',
  templateUrl: './view-staff-info.component.html',
  styleUrls: ['./view-staff-info.component.css']
})
export class ViewStaffInfoComponent implements OnInit{
  constructor(private router:Router,
    private route:ActivatedRoute,
    private memberStaffService:MemberStaffService){}
  ngOnInit(): void {
    const staff = this.route.snapshot.queryParamMap.get('id');
    this.fetchStaffById(staff)
    // console.log(staff);
  }


  staffInfo:any
  fetchStaffById(id:any){
    this.memberStaffService.getStaffById(id).subscribe((resp:any)=>{
      // console.log(resp);
      this.staffInfo = resp;
      
    })
  }

  onBack(){
    this.router.navigate(['staff-info']);
  }

}
