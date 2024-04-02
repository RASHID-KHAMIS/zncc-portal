import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
  private usersService:UsersService) { }
  loginForm !: FormGroup;
  shouldAddClass1 = false;
  shouldAddClass2 = true;
  password = false
  loading:boolean = false;
  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
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

  onLogin(){
    if (this.loginForm.value.email == '') {
      this.shouldAddClass1 = true
    } else if (this.loginForm.value.password == '') {
      this.password = true
    } else {
      this.loading = true;
      const values = this.loginForm.value;
      const jwtHelper = new JwtHelperService();
      this.usersService.userLogin(values).subscribe((resp:any)=>{
      if(resp?.error?.status==404 || resp?.error?.status==401){
        this.alert2();
        this.loading = false;
      }else{
        const decodedToken = jwtHelper.decodeToken(resp.accessToken);
        // console.log(decodedToken.sub);
        
        this.loading = false;
        if(decodedToken.sub.role.length >= 1){
          // console.log(decodedToken.sub);
          localStorage.setItem('fisrName',decodedToken.sub.fisrName),
          localStorage.setItem('role',decodedToken.sub.role),
          localStorage.setItem('email',decodedToken.sub.email),
          localStorage.setItem('memberAccountId',decodedToken.sub.userMemberId),
          localStorage.setItem('id',decodedToken.sub.id)
        }
        this.alert();
        if(decodedToken.sub.loginStatus == 0){
          this.alert3();
        }else{
          this.router.navigate(["home"])
        }
      }
      },  (error: HttpErrorResponse) => {

        this.alert2();
      }
      )
     
    }
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
      title: 'Signed in successfully'
    })
  }


  alert2(){
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
      title: 'Invalid Credentials'
    })
  }

  alert3(){
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
      title: 'You have not verify your registration'
    })
  }




}
