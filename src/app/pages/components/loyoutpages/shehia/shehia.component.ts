import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shehia',
  templateUrl: './shehia.component.html',
  styleUrls: ['./shehia.component.css']
})
export class ShehiaComponent implements OnInit{
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No','DistrictName','ShehiaCode', 'ShehiaName','action'];
  loding: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;

  constructor(private dialog:MatDialog,){}
  ngOnInit(): void {
  
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {

    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"

        } else if (result === 'no') {
        }
      }
    })
  }
}
