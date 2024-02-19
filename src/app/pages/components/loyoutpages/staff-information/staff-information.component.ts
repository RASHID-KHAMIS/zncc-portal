import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StaffsService } from 'src/app/pages/services/membersservice/staffs.service';

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css']
})
export class StaffInformationComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'fullName', 'regNo', 'gender', 'physicalAddress', 'phoneNumber', 'action'];
  loding: boolean = true;


  constructor(private staffServices: StaffsService) {
  }
  ngOnInit(): void {
    this.getAllStaff()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllStaff() {
    this.staffServices.getPosts().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res)
      this.loding = false
    })
  }
}
