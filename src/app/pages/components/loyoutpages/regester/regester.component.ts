import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MemberService } from 'src/app/pages/services/membersservice/member.service';
import Swal from 'sweetalert2';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.css']
})
export class RegesterComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'order_number', 'company_id', 'paper_id', 'quantity', 'action'];
  memberForm!: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;
  selectedFile!: ImageSnippet;
  preview = './../../../../../assets/avata.png';
  isSoleProprietorship: boolean = false
  progress = 0;
  message = '';


  imageInfos?: Observable<any>;
  constructor(private fb: FormBuilder, private memberService: MemberService) { }

  ngOnInit(): void {
    this.initForm();

    // this.memberForm.get('membership_type')?.valueChanges.subscribe(value => {
    //   console.log('Selected Membership Type:', value);
    // });

  }

    // Function to handle radio button click
    onRadioButtonClick(value: any) {
      console.log(value);
      this.memberForm.patchValue({
        membership_type:value
      })
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

  initForm() {
    this.memberForm = new FormGroup({
      company_name:new FormControl('', Validators.required),
      company_email:new FormControl('', [Validators.required, Validators.email]),
      company_phone:new FormControl(''),
      region: new FormControl(''),
      district: new FormControl(''),
      owner_name: new FormControl(''),
      owner_email: new FormControl(''),
      owner_phone: new FormControl(''),
      representative_name: new FormControl(''),
      gender: new FormControl(''),
      position: new FormControl(''),
      representative_email: new FormControl(''),
      representative_phone:new FormControl(''),
      business_type: new FormControl(''),
      business_cluster: new FormControl(''),
      business_activity:new FormControl(''),
      company_certificate: new FormControl(''),
      representative_cv: new FormControl(''),
      membership_type: new FormControl('')
      // Add more form controls for the new fields
    });
  }

  
  submit() {
    const values = this.memberForm.value;
    console.log(values);
  
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
