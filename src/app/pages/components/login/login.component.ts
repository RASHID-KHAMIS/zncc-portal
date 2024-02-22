import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService:UsersService) { }
  loginForm !: FormGroup;
  shouldAddClass1 = false;
  shouldAddClass2 = true;
  password = false
  ngOnInit(): void {
    this.createForm()
  }
  // Set your condition to add a class
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
      
      const values = this.loginForm.value;
      const jwtHelper = new JwtHelperService();
      // console.log(values);
      this.usersService.userLogin(values).subscribe((resp:any)=>{
        // console.log(resp);
        const decodedToken = jwtHelper.decodeToken(resp.accessToken);
        // console.log(decodedToken.sub);
        
        if(decodedToken.sub.role.length >= 1){
          console.log(decodedToken.sub.role);
          localStorage.setItem('role',decodedToken.sub.role),
          localStorage.setItem('email',decodedToken.sub.email)

        }
        this.alert();
         this.router.navigate(["home"])
      })
     
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



}
