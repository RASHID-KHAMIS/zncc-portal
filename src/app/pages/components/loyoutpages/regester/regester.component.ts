import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  onRadioButtonClickTrue() {
    this.isSoleProprietorship = true
  }
  onRadioButtonClick() {
    this.isSoleProprietorship = false
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
    this.memberForm = this.fb.group({
      company_name: ['', Validators.required],
      company_email: ['', [Validators.required, Validators.email]],
      company_phone: [''],
      region: [''],
      district: [''],
      owner_name: [''],
      owner_email: [''],
      owner_phone: [''],
      representative_name: [''],
      gender: [''],
      position: [''],
      representative_email: [''],
      representative_phone: [''],
      business_type: [''],
      business_cluster: [''],
      business_activity: [''],
      company_certificate: [''],
      representative_cv: ['']
      // Add more form controls for the new fields
    });
  }

  submit() {


    this.memberService.addPost(this.memberForm.value).subscribe((res: any) => {
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
