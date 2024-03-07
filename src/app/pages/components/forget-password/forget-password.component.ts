import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  shouldAddClass1 = false;
  shouldAddClass2 = true;
  loading:boolean = false;
  constructor(){}
  ngOnInit(): void {
  
  }


  inputData(data: any) {
    if (data != '') {
      this.shouldAddClass1 = false
    }

  }

}
