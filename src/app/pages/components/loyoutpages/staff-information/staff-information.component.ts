import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MemberStaffService } from 'src/app/pages/services/member-staff.service';
import { StaffsService } from 'src/app/pages/services/membersservice/staffs.service';

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css']
})
export class StaffInformationComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'fullName', 'regNo', 'gender', 'physicalAddress', 'phoneNumber', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loding: boolean = true;


  constructor(private staffServices: StaffsService,
    private memberStaffService:MemberStaffService,
    private router:Router) {
  }
  ngOnInit(): void {
    this.getAllStaff();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllStaff() {
    this.memberStaffService.getAllStaff().subscribe((resp:any)=>{
      this.dataSource = new MatTableDataSource(resp);
      // console.log(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loding = false
    })
  }

  onEdit(data:any){
    this.router.navigate(['/edit-staff'], { queryParams: { id: data.id} });
  }

}
