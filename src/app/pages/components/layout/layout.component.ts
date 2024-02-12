import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // role: any = localStorage.getItem("role")
  // fullName: any = localStorage.getItem("fullName")
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    // this.role = localStorage.getItem("role")
    // this.fullName = localStorage.getItem("fullName")
    // this.cheLoging()
  }

  cheLoging() {
    // let localData = localStorage.getItem("user")
    // if (localData == null) {
    //   this.router.navigate(["/"])
    // }
  }

  logout() {
    localStorage.clear()
    this.router.navigate(["/"])
  }
}
