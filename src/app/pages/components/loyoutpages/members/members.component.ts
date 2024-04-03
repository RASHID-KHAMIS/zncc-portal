import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import { MembershipService } from 'src/app/pages/services/membership.service';
import { MemberService } from 'src/app/pages/services/membersservice/member.service';
import { ZoneService } from 'src/app/pages/services/zone.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id','company_name','company_email','company_phone','sectorName','subSectorName','representative_name','action'];
  loding = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  check: boolean = false;

  activeList: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'In Active' },
  ];
  constructor(
    private membershipService: MembershipService,
    private router: Router,
    private businessService: BusinessService
  ) {}
  ngOnInit(): void {
    this.getAllVerifiedMembership();
    this.fetchAllBusinessSector();
    this.fetchAllActiveMember();
    this.fetchAllAInActiveMember();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sectorList: any;
  fetchAllBusinessSector() {
    this.businessService.getAllBusinessSector().subscribe((resp: any) => {
      this.sectorList = resp;
    });
  }

  getAllVerifiedMembership() {
    this.membershipService.getVerifiedMember().subscribe((resp: any) => {
      // console.log(resp);
      this.loding = false;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSectorSelectionChange(event: any) {
    const sectorId = event.value;
    // console.log(sectorId);
    this.fetchVerifiedMemberBySectorId(sectorId);
  }

  onSectorSelectionChange2(event:any){
    // console.log(event.value);
    if(event.value==1){
      this.fetchAllActiveMember();
    }else{
      this.fetchAllAInActiveMember();
    }
    
  }

  fetchVerifiedMemberBySectorId(id: any) {
    this.membershipService.getVerifiedMemberBySectorId(id).subscribe((resp: any) => {
        // console.log(resp);
        this.loding = false;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  fetchAllActiveMember(){
    this.membershipService.getAllActiveMember().subscribe((resp:any)=>{
      // console.log(resp);
      this.loding = false;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  fetchAllAInActiveMember(){
    this.membershipService.getAllAInctiveMember().subscribe((resp:any)=>{
      // console.log(resp);
      this.loding = false;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onView(data: any) {
    this.router.navigate(['/view-member-info'], {queryParams: { id: data.memberShipFormId }});
  }
}
