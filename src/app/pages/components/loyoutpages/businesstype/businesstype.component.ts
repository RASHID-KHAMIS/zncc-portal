import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'src/app/pages/services/bussnessservices/business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-businesstype',
  templateUrl: './businesstype.component.html',
  styleUrls: ['./businesstype.component.css']
})
export class BusinesstypeComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'typeName', 'code', 'action'];
  loding = true
  @ViewChild('callDialog') callDialog!: TemplateRef<any>;
  businesForm!: FormGroup
  constructor(private businessService: BusinessService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.getAll()
    this.createForm()
  }

  createForm() {
    this.businesForm = new FormGroup({
      typeName: new FormControl(''),
      typeCode: new FormControl('444')
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  dialgOpen() {
    let dialogRef = this.dialog.open(this.callDialog, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"
          console.log(result);
        } else if (result === 'no') {
          // console.log('User clicked no.');
        }
      }
    })
  }

  getAll() {
    this.businessService.getPosts()
      .subscribe((res: any) => {
        this.loding = false

        this.dataSource = new MatTableDataSource(res);
      })
  }

  submit() {
    this.businessService.addPost(this.businesForm.value).subscribe((data: any) => {
      this.succeAlart()
      this.getAll()
    })
  }
  succeAlart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }
  invalidAlart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Invalid Email Or Password'
    })
  }
  failedAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Un Authorized'
    })
  }
}
