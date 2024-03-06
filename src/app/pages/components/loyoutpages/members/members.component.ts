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
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'company_name', 'company_email', 'company_phone', 'representative_name', 'action'];
  loding = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  check:boolean = false;
  constructor(private membershipService: MembershipService,
    private router:Router,
    private businessService:BusinessService) {

  }
  ngOnInit(): void {
    this.getAllMembership();
    this.fetchAllBusinessSector()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sectorList:any;
  fetchAllBusinessSector(){
    this.businessService.getAllBusinessSector().subscribe((resp:any)=>{
      // console.log(resp);
      this.sectorList = resp;
    })
  }


  getAllMembership() {
    this.membershipService.getAllMembership().subscribe((resp: any) => {
   
      this.loding = false;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        })
  }

  onSectorSelectionChange(event: any) {
    const sectorId = event.value;
    // console.log(sectorId);
    this.fetchMemberBySectorId(sectorId);
  }

  fetchMemberBySectorId(id:any){
        this.membershipService.getMemberBySectorId(id).subscribe((resp:any)=>{
        // console.log(resp);
      
        this.loding = false;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
       })
    
    
  }

  onView(data:any){
    // console.log(data);
    this.router.navigate(['/view-member-info'], { queryParams: { id: data.memberShipFormId} });
  }
}
