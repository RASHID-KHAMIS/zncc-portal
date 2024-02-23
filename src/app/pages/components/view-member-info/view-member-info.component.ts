import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipService } from '../../services/membership.service';

@Component({
  selector: 'app-view-member-info',
  templateUrl: './view-member-info.component.html',
  styleUrls: ['./view-member-info.component.css']
})
export class ViewMemberInfoComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private membershipService:MembershipService){}
  ngOnInit(): void {

    const member = this.route.snapshot.queryParamMap.get('id');
    // console.log(member);
    this.fetchMemberByID(member)
  
  }

  memberInfo:any;
  fetchMemberByID(memberId:any){
    this.membershipService.getByMemberId(memberId).subscribe((resp:any)=>{
      // console.log(resp);
      this.memberInfo = resp;
      
    })
  }


}
