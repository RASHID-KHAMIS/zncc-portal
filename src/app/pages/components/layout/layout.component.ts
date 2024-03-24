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
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.username = localStorage.getItem("fisrName")
  }


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
