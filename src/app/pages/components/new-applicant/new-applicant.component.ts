import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MembershipService } from '../../services/membership.service';
import { Router } from '@angular/router';
import { BusinessService } from '../../services/bussnessservices/business.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-new-applicant',
  templateUrl: './new-applicant.component.html',
  styleUrls: ['./new-applicant.component.css']
})
export class NewApplicantComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'company_name', 'company_email', 'company_phone', 'representative_name', 'action'];
  loding = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private membershipService: MembershipService,
    private router:Router,
    private businessService:BusinessService,
    private zoneService:ZoneService) {

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
    this.membershipService.getAllMembership().subscribe((res: any) => {
        this.loding = false;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  onView(data:any){
    console.log(data);
    this.router.navigate(['/view-member-info'], { queryParams: { id: data.memberShipFormId} });
  }
}
