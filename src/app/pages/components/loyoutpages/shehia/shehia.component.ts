import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictService } from 'src/app/pages/services/district.service';
import { ShehiaService } from 'src/app/pages/services/shehia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shehia',
  templateUrl: './shehia.component.html',
  styleUrls: ['./shehia.component.css'],
})
export class ShehiaComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No','ShehiaName','DistrictName','ShehiaCode','action'];
  loding: boolean = true;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  shehiaForm!: FormGroup;
  shehiaEditForm!: FormGroup;
  loading:boolean = true;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private shehiaService: ShehiaService,
    private districtService: DistrictService
  ) {}
  ngOnInit(): void {
    this.fetchAllShehia();
    this.fetchAllDistrict();
    this.configureForm();
    this.configureEditForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllShehia() {
    this.shehiaService.getAllShehia().subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp);
      this.loading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  districtList: any;
  fetchAllDistrict() {
    this.districtService.getAllDistricts().subscribe((resp: any) => {
      // console.log(resp);
      this.districtList = resp;
    });
  }

  configureForm() {
    this.shehiaForm = new FormGroup({
      shehiaName: new FormControl(null,Validators.required),
      shehiaCode: new FormControl(null,Validators.required),
      districtId: new FormControl(null,Validators.required),
    });
  }

  configureEditForm() {
    this.shehiaEditForm = new FormGroup({
      id:new FormControl(null),
      shehiaName: new FormControl(null,Validators.required),
      districtId: new FormControl(null,Validators.required),
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = 'Y';
        } else if (result === 'no') {
        }
      }
    });
  }

  openDialog2(row:any) {
    // console.log(row);
    
    this.shehiaEditForm = new FormGroup({
      id:new FormControl(row.id),
      shehiaName: new FormControl(row.shehiaName),
      districtId: new FormControl(row.districtId),
    });
    let dialogRef = this.dialog.open(this.distributionDialog2, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = 'Y';
        } else if (result === 'no') {
        }
      }
    });
  }


  onSave(){
    const values = this.shehiaForm.value;
    // console.log(values);
    this.shehiaService.addShehia(values).subscribe((resp:any)=>{
      this.alert();
      this.reload();

    })
  }


  onEdit(){
    const id = this.shehiaEditForm.value.id;
    const values = this.shehiaEditForm.value;
    this.shehiaService.editShehia(id,values).subscribe((resp:any)=>{
      this.alert2();
      this.reload()
    })
  }
  onBlock(row:any){
    // console.log(row);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this shehia!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.id;
        row.currentStatus = '0';
        this.shehiaService.editShehiaStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'Shehia has been blocked.',
          icon: 'warning',
        });
      }
    });
    
    
  }

  unBlock(row:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want block this shehia!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        const id = row.id;
        row.currentStatus = '1';
        this.shehiaService.editShehiaStatus(id, row).subscribe((resp: any) => {});
        Swal.fire({
          title: 'Blocked!',
          text: 'Shehia has been blocked.',
          icon: 'success',
        });
      }
    });
  }
  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['shehia'])
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
      title: 'District Added Successfully'
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
      title: 'District Edited Successfully'
    })
  }
}
