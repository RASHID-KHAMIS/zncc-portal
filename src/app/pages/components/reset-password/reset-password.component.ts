import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  constructor(private router: Router,
    private route:ActivatedRoute,
    private usersService:UsersService) { }
    resetForm !: FormGroup;
    shouldAddClass1 = false;
    shouldAddClass2 = true;
    password = false
    ngOnInit(): void {
      this.createForm()
    }
    createForm() {
      this.resetForm = new FormGroup({
        oldPassword: new FormControl(''),
        password: new FormControl(''),
        password2:new FormControl(''),
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
      if (this.resetForm.value.oldPassword == '') {
        this.shouldAddClass1 = true
      } else if (this.resetForm.value.password == '') {
        this.password = true
      } else if(this.resetForm.value.password == ''){

      }else {
        
        const values = this.resetForm.value;
        const jwtHelper = new JwtHelperService();
        if(this.resetForm.value.password != this.resetForm.value.password2){
          this.alert();
          
        }else{
          const values = { ...this.resetForm.value }; 
          delete values.password2; 
          // console.log(values);
          this.usersService.userFirstLogin(this.route.snapshot.queryParamMap.get('id'),values).subscribe((resp:any)=>{
            console.log(resp);
            
            this.alert2();
            this.router.navigate(["home"])
          })
        }
      
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
        icon: 'error',
        title: 'Password and Confirm Password does not match'
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
        icon: 'success',
        title: 'Signed in successfully'
      })
    }
  
  
  
}
