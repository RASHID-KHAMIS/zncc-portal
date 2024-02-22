import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipService } from '../../services/membership.service';

@Component({
  selector: 'app-view-member-info',
  templateUrl: './view-member-info.component.html',
  styleUrls: ['./view-member-info.component.css']
})
export class ViewMemberInfoComponent implements OnInit{

  constructor(private router:Router,
    private membershipService:MembershipService){}
  ngOnInit(): void {
  
  }


}
