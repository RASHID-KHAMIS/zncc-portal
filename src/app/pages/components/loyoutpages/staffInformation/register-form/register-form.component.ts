import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { StaffsService } from 'src/app/pages/services/membersservice/staffs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'order_number', 'company_id', 'paper_id', 'quantity', 'action'];
  staffForm!: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;

  preview = './../../../../../assets/avata.png';

  progress = 0;
  message = '';


  imageInfos?: Observable<any>;
  constructor(private fb: FormBuilder, private staffsService: StaffsService) { }

  ngOnInit(): void {
    this.initForm();
    // this.imageInfos = this.uploadService.getFiles();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;


      }

      this.selectedFiles = undefined;
    }
  }

  initForm(): void {
    this.staffForm = this.fb.group({
      regNo: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: [null, Validators.required],
      gender: ['', Validators.required],
      maritalStatus: [''],
      physicalAddress: [''],
      isResidence: [false],
      district: [''],
      zanId: [''],
      phoneNumber: [''],
      isStaffHaveDisability: [false],
      religion: [''],
      region: [''],
      shehia: [''],
      streetName: [''],
      postCode: [''],
      houseNo: [''],
      terminationStatus: [1],
      email: ['', Validators.email],
      zone: [''],
      workPhone: [''],
      workEmail: [''],
      bankName: [''],
      accountNumber: [''],
      staffTypeId: [1],
      staffPosition: [''],
      staffCategory: [1],
    });
  }


  submit() {
    this.staffsService.addPost(this.staffForm.value).subscribe((res: any) => {
      this.succeAlart()
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
