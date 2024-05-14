import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberStaffService } from 'src/app/pages/services/member-staff.service';
import { UsersService } from 'src/app/pages/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'No',
    'Name',
    'Email',
    'role',
    'Status',
    'LoginStatus',
    'Actions',
  ];
  loading: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userEditForm!: FormGroup;
  userForm!: FormGroup;
  RegForm!: FormGroup;

  RoleList: any[] = [
    { value: 'SUPER ADMIN', viewValue: 'SUPER ADMIN' },
    { value: 'MEMBERSHIP', viewValue: 'MEMBERSHIP OFFICER' },
    { value: 'ACCOUNTANT', viewValue: 'ACCOUNTANT' },
    { value: 'IT OFFICER', viewValue: 'IT OFFICER' },
    { value: 'DIRECTOR', viewValue: 'DIRECTOR' },
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private usersService: UsersService,
    private memberStaffService: MemberStaffService
  ) {}
  ngOnInit(): void {
    this.fetchAllStaff();
    this.configureUserForm();
    this.configureForm();
    this.configureRegForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllStaff() {
    this.usersService.getAllStaff().subscribe((resp: any) => {
      // console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  openDialog() {
    const values = this.RegForm.value;
    // console.log(values.regNo);
    this.memberStaffService
      .getStaffByRegNo(values.regNo)
      .subscribe((resp: any) => {
        this.userForm = new FormGroup({
          email: new FormControl(resp.email),
          staffId: new FormControl(resp.id),
          role: new FormControl(null),
          lastName: new FormControl(resp.lastName),
        });
      });

    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = 'Y';
        } else if (result === 'no') {
        }
      }
    });
  }

  openDialog2(row: any) {
    // console.log(row);
    this.userEditForm = new FormGroup({
      id: new FormControl(row.id),
      role: new FormControl(row.role),
    });

    let dialogRef = this.dialog.open(this.distributionDialog2, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = 'Y';
        } else if (result === 'no') {
        }
      }
    });
  }

  configureRegForm() {
    this.RegForm = new FormGroup({
      regNo: new FormControl(null, Validators.required),
    });
  }
  configureUserForm() {
    this.userForm = new FormGroup({
      email: new FormControl(null),
      role: new FormControl(null),
      lastName: new FormControl(null),
    });
  }

  onAdd() {
    const values = this.userForm.value;
    // console.log(values);
    this.usersService.addUserStaff(values).subscribe(
      (resp: any) => {
        this.alert();
        this.reload();
      },
      (error: HttpErrorResponse) => {
        if (error.status == 409) {
          Swal.fire('This User already exists!');
        }
      }
    );
  }

  configureForm() {
    this.userEditForm = new FormGroup({
      id: new FormControl(null),
      role: new FormControl(null),
    });
  }

  onEdit() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Change role of the user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = this.userEditForm.value.id;
        const values = this.userEditForm.value;
        this.usersService
          .editUserStaff(id, values)
          .subscribe((resp: any) => {});
        Swal.fire({
          title: 'changed!',
          text: 'changed Successfully.',
          icon: 'success',
        });
        this.reload();
      }
    });
  }

  onBlock(row: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.id;
        row.status = '0';
        this.usersService.editUserStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'User has been blocked.',
          icon: 'warning',
        });
      }
    });
  }

  unBlock(row: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Un block this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Un block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.id;
        row.status = '1';
        this.usersService.editUserStatus(id, row).subscribe((resp: any) => {});

        Swal.fire({
          title: 'Un blocked!',
          text: 'User Unblocked Successfully.',
          icon: 'success',
        });
      }
    });
  }

  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['user-management']);
    });
  }

  alert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'User Added Successfully',
    });
  }

  alert2() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'User Role Edited',
    });
  }
}
