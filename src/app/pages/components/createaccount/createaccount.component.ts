import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateaccountService } from '../../services/createaccountservice/createaccount.service';
import Swal from 'sweetalert2';
import { MemberService } from '../../services/membersservice/member.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  constructor(
    private router: Router,
    private service: CreateaccountService,
    private memberService:MemberService) { }
  userForm !: FormGroup;
  shouldAddClass1 = false;
  shouldAddClass2 = true;
  password = false
  repassword = false
  ngOnInit(): void {
    this.createForm()
  }
  // Set your condition to add a class
  createForm() {
    this.userForm = new FormGroup({
      emailAddress:new FormControl(null,Validators.email),
        dob: new FormControl(null,Validators.required),
        nationality: new FormControl(null,Validators.required),
        idNumber: new FormControl(null,Validators.required),
        gender: new FormControl(null,Validators.required),
        fisrName: new FormControl(null,Validators.required),
        middleName: new FormControl(null,Validators.required),
        lastName: new FormControl(null,Validators.required),
        mobile: new FormControl(null,Validators.required),

    })

  }

  onCreate(){
    const values = this.userForm.value;
    // console.log(values);
    this.memberService.addMember(values).subscribe((resp:any)=>{
      // console.log('added');
      this.alert();
      this.reload()
    })
    
  }
  togglePassword(input: HTMLInputElement) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
  inputData(data: any) {
    if (data != '') {
      this.shouldAddClass1 = false
    }

  }
  inputPass(data: any) {
    if (data != '') {
      this.password = false
    }

  }

  submit() {
    if (this.userForm.value.email == '') {
      this.shouldAddClass1 = true
    } else if (this.userForm.value.password == '') {
      this.password = true
    } else if (this.userForm.value.repassword != this.userForm.value.password) {
      this.repassword = true
    } else {
      this.userForm.patchValue({
        role: "MEMBER"
      })
      this.deleteControl('repassword');



      this.service.addPost(this.userForm.value).subscribe(
        (data: any) => {

          this.router.navigate(["/"])
          this.succeAlart()

        },
        (error: any) => {
          // Handle errors from the login request
          this.invalidAlart()
          // Perform actions based on the error, such as displaying an error message to the user
        }
      );
    }


  }
  deleteControl(key: string) {
    // Check if the control exists before removing it
    if (this.userForm.contains(key)) {
      this.userForm.removeControl(key);
    } else {
      console.error(`Control with key '${key}' does not exist.`);
    }
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

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate([''])
    })
  }

  alert(){
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
      title: 'User Created Successfully'
    })
  }

}
