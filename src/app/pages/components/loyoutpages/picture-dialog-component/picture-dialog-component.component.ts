import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewMemberInfoComponent } from '../../view-member-info/view-member-info.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-picture-dialog-component',
  templateUrl: './picture-dialog-component.component.html',
  styleUrls: ['./picture-dialog-component.component.css']
})
export class PictureDialogComponentComponent implements OnInit {

  pdfUrl!: SafeResourceUrl;
  constructor(
    public dialogRef: MatDialogRef<ViewMemberInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
   
   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://' + this.data.pictureUrl);
   console.log(this.pdfUrl);
  
   
    // const extension = this.data.pictureUrl.split('.').pop().toLowerCase();
    // if (extension === 'pdf') {
    //   this.pdfUrl = this.data.pictureUrl;
    
    // } else {
    //   console.error('The file is not a PDF.');
    // }
 
  }

  onError(event: ErrorEvent): void {
    console.error('Error loading PDF:', event.message);
    // Handle the error as needed, e.g., display a message to the user
  }
}
