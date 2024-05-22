import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { LoginComponent } from './pages/components/login/login.component';
import { DashboardComponent } from './pages/components/loyoutpages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './pages/components/loyoutpages/members/members.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterComponent } from './pages/components/loyout/footer/footer.component';
import { RegesterComponent } from './pages/components/loyoutpages/regester/regester.component';
import { StaffInformationComponent } from './pages/components/loyoutpages/staff-information/staff-information.component';
import { RegisterFormComponent } from './pages/components/loyoutpages/staffInformation/register-form/register-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { CreateaccountComponent } from './pages/components/createaccount/createaccount.component';
import { MemberInformationComponent } from './pages/components/loyoutpages/member-information/member-information.component';
import { HttpClientModule } from '@angular/common/http';
import { MonthbarComponent } from './pages/components/loyoutpages/dashboard/monthbar/monthbar.component';
import { PiechartComponent } from './pages/components/loyoutpages/dashboard/piechart/piechart.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { BusinesstypeComponent } from './pages/components/loyoutpages/businesstype/businesstype.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PaymentComponent } from './pages/components/loyoutpages/payment/payment.component';
import { RegionComponent } from './pages/components/loyoutpages/region/region.component';
import { ZoneComponent } from './pages/components/loyoutpages/zone/zone.component';
import { DistrictComponent } from './pages/components/loyoutpages/district/district.component';
import { ShehiaComponent } from './pages/components/loyoutpages/shehia/shehia.component';
import { CardComponent } from './pages/components/card/card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BusinessSizeComponent } from './pages/components/loyoutpages/business-size/business-size.component';
import { DepartmentComponent } from './pages/components/loyoutpages/department/department.component';
import {MatSelectModule} from '@angular/material/select';
import { ViewMemberInfoComponent } from './pages/components/view-member-info/view-member-info.component';
import { UserManagementComponent } from './pages/components/loyoutpages/user-management/user-management.component';
import { StaffPositionComponent } from './pages/components/staff-position/staff-position.component';
import { EditStaffComponent } from './pages/components/loyoutpages/edit-staff/edit-staff.component';
import { ResetPasswordComponent } from './pages/components/reset-password/reset-password.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NewApplicantComponent } from './pages/components/new-applicant/new-applicant.component';
import {MatIconModule} from '@angular/material/icon';
import { PictureDialogComponentComponent } from './pages/components/loyoutpages/picture-dialog-component/picture-dialog-component.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditCompanyInfoComponent } from './pages/components/loyoutpages/edit-company-info/edit-company-info.component';
import { ForgetPasswordComponent } from './pages/components/forget-password/forget-password.component';
import { ViewStaffInfoComponent } from './pages/components/loyoutpages/view-staff-info/view-staff-info.component';
import { BusinessSubSectorComponent } from './pages/components/loyoutpages/business-sub-sector/business-sub-sector.component';
import { MemberDashboardComponent } from './pages/components/loyoutpages/member-dashboard/member-dashboard.component';

// import { PdfViewerModule } from 'ngx-extended-pdf-viewer'





@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    MembersComponent,
    FooterComponent,
    RegesterComponent,
    StaffInformationComponent,
    RegisterFormComponent,
    CreateaccountComponent,
    MemberInformationComponent,
    MonthbarComponent,
    PiechartComponent,
    PaymentComponent,
    BusinesstypeComponent,
    RegionComponent,
    ZoneComponent,
    DistrictComponent,
    ShehiaComponent,
    CardComponent,
    BusinessSizeComponent,
    DepartmentComponent,
    ViewMemberInfoComponent,
    UserManagementComponent,
    StaffPositionComponent,
    EditStaffComponent,
    ResetPasswordComponent,
    NewApplicantComponent,
    PictureDialogComponentComponent,
    EditCompanyInfoComponent,
    ForgetPasswordComponent,
    ViewStaffInfoComponent,
    BusinessSubSectorComponent,
    MemberDashboardComponent,


   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    PdfViewerModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
