import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from 'src/app/pages/services/membersservice/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'company_name', 'company_email', 'company_phone', 'owner_name', 'action'];
  loding = true
  constructor(private memberService: MemberService) {

  }
  ngOnInit(): void {
    // this.getAll()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // getAll() {
  //   this.memberService.getPosts()
  //     .subscribe((res: any) => {
  //       this.loding = false
  //       this.dataSource = new MatTableDataSource(res);
  //     })
  // }
}
