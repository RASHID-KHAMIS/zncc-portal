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
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.role = localStorage.getItem("role")
    // console.log(this.role);
    
    // this.fullName = localStorage.getItem("fullName")
    // this.cheLoging()
  }

  cheLoging() {
    // let localData = localStorage.getItem("user")
    // if (localData == null) {
    //   this.router.navigate(["/"])
    // }
  }

  // Onlogout() {
  //   localStorage.clear()
  //   this.router.navigate(["/"])
  // }

  onLogOut(){
    localStorage.clear();
    this.router.navigateByUrl("/");
    this.alert();
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
