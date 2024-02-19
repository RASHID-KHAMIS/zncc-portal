import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    // private loginService: LoginService
  ) { }
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

  submit() {
    if (this.loginForm.value.email == '') {
      this.shouldAddClass1 = true
    } else if (this.loginForm.value.password == '') {
      this.password = true
    } else {
      this.router.navigate(["home"])
      // if (this.loginForm.value.email === email && this.loginForm.value.password == password) {

      // } else {

      // }
    }


  }
}
