import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})


export class LayoutComponent {
  role: any;
  username:any;
  fname:any;
  lname:any
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.fname = localStorage.getItem("fisrName")
    this.lname = localStorage.getItem("lastName")

    this.username = this.fname + " " + this.lname
  }


  onLogOut(){
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
  }).then((result) => {
      if (result.isConfirmed) {
          sessionStorage.clear();
          this.router.navigate(["/"]);
          this.alert();
      }
  });

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
      title: 'Signed Out Successfully'
    })
  }

}
