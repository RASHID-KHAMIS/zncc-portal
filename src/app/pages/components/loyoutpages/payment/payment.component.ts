import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyOwnershipService } from 'src/app/pages/services/company-ownership.service';
import { InvoicesService } from 'src/app/pages/services/invoices.service';
import { MembershipService } from 'src/app/pages/services/membership.service';
import Swal from 'sweetalert2';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['No', 'companyName', 'invoiceNumber', 'nvoiceDate', 'invoiceAmount', 'paymentStatus'];

  dataSource2 = new MatTableDataSource();
  displayedColumns2: string[] = ['No', 'companyName', 'companyPhone', 'invoiceNumber', 'nvoiceDate', 'invoiceAmount', 'paymentStatus', 'View', 'Actions'];
  loading: boolean = true;
  spinnerLoading: boolean = false;
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  role: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  zoneForm!: FormGroup;
  zoneEditForm!: FormGroup;
  memberAccountId: any;

  selectedFiles?: FileList;
  currentFile?: File;
  selectedFile!: ImageSnippet;
  preview = './../../../../../assets/avata.png';
  isSoleProprietorship: boolean = false
  progress = 0;
  message = '';
  files: any;
  invoiceForm!: FormGroup;
  check: boolean = false;
  check2: boolean = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private invoicesService: InvoicesService,
    private membershipService: MembershipService,
    private companyOwnershipService: CompanyOwnershipService,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.memberAccountId = localStorage.getItem('memberAccountId');
    // this.memberAccountId = localStorage.getItem('memberAccountId');
    // console.log(this.memberAccountId);

    this.role = localStorage.getItem('role');
    this.fetchAllInvoice();
    this.fetchByMembershipId();
    this.configureForm();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllInvoice() {
    this.invoicesService.getAllInvoice().subscribe((resp: any) => {
      // console.log(resp);
      if (resp.length > 0) {
        this.check = true;

      }
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  memberInfo: any;
  fetchByMembershipId() {
    this.spinnerLoading = true;
    this.membershipService.getMembershirpsByMemberID(this.memberAccountId).subscribe((resp: any) => {

      this.memberInfo = resp;
      // console.log(this.memberInfo.memberShipFormId);
      this.invoicesService.getInvoiceByFormId(this.memberInfo.memberShipFormId).subscribe((resp: any) => {
        // console.log(resp);
        if (resp.length > 0) {
          this.check2 = true;
          this.spinnerLoading = false
        }
        this.dataSource2 = new MatTableDataSource(resp);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        this.loading = false;
        this.spinnerLoading = false
      })
    })
  }

  configureForm() {
    this.invoiceForm = new FormGroup({
      file: new FormControl('Invoice'),
    })
  }

  openPdf2(file: any) {
    this.invoicesService.getFileInvoiceByInvoiceId(file.invoiceId).subscribe((resp: any) => {
      // console.log(resp);

      if (resp && resp.file_path) {
        const extension = resp.file_path.split('.').pop().toLowerCase();
        if (extension === 'pdf') {
          const dialogOptions = 'width=800,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
          window.open('https://' + resp.file_path, 'PDF Dialog', dialogOptions);
        } else {
          console.error('The file is not a PDF.');
        }
      } else {
        console.error('Invalid file object.');
      }

    })
  }


  onBack() {
    this.router.navigate(['home'])
  }

  onBack2(){
    this.router.navigate(['dashboard'])
  }



  openDialog(row: any) {
    // console.log(row.invoiceId);
    this.invoiceForm = new FormGroup({
      invoiceId: new FormControl(row.invoiceId)
    })

    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"

        } else if (result === 'no') {
        }
      }
    })
  }

  onSubmit() {
    const values = this.invoiceForm.value;
    const form = new FormData();
    form.append('file', this.files, this.files.name);
    form.append('invoiceId', values.invoiceId);
    this.invoicesService.addFileInvoices(form).subscribe((resp: any) => {
      this.alert();
      this.reload()

    })

  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }


  processFile(imageInput: any) {
    this.loading = true;
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.files = file;
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.loading = false;
    });

    reader.readAsDataURL(file);
  }

  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['payment'])
    })
  }

  alert() {
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
      title: 'Receipt Added Successfully'
    })
  }


}