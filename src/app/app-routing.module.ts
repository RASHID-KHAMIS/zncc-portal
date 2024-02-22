import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { DashboardComponent } from './pages/components/loyoutpages/dashboard/dashboard.component';
import { MembersComponent } from './pages/components/loyoutpages/members/members.component';
import { RegesterComponent } from './pages/components/loyoutpages/regester/regester.component';
import { StaffInformationComponent } from './pages/components/loyoutpages/staff-information/staff-information.component';
import { RegisterFormComponent } from './pages/components/loyoutpages/staffInformation/register-form/register-form.component';
import { CreateaccountComponent } from './pages/components/createaccount/createaccount.component';
import { MemberInformationComponent } from './pages/components/loyoutpages/member-information/member-information.component';

import { BusinesstypeComponent } from './pages/components/loyoutpages/businesstype/businesstype.component';

import { PaymentComponent } from './pages/components/loyoutpages/payment/payment.component';
import { ZoneComponent } from './pages/components/loyoutpages/zone/zone.component';
import { RegionComponent } from './pages/components/loyoutpages/region/region.component';
import { DistrictComponent } from './pages/components/loyoutpages/district/district.component';
import { ShehiaComponent } from './pages/components/loyoutpages/shehia/shehia.component';
import { BusinessSizeComponent } from './pages/components/loyoutpages/business-size/business-size.component';
import { DepartmentComponent } from './pages/components/loyoutpages/department/department.component';
import { ViewMemberInfoComponent } from './pages/components/view-member-info/view-member-info.component';



const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'create-account', component: CreateaccountComponent
  },
  {
    path: '', component: LayoutComponent
    ,
    children: [
      {
        path: 'home', component: DashboardComponent,

      },
      {
        path: 'members', component: MembersComponent
      },
      {
        path: 'regester', component: RegesterComponent
      }, {
        path: 'staff-info', component: StaffInformationComponent
      },
      {
        path: 'payment', component: PaymentComponent
      },
      {
        path: 'register-staff', component: RegisterFormComponent
      },
      {
        path: 'memberInfor', component: MemberInformationComponent
      },
      {
        path: 'business-type', component: BusinesstypeComponent
      },
      {
        path: 'zone', component: ZoneComponent
      },
      {
        path:'region',component:RegionComponent
      },
      {
        path:'district',component:DistrictComponent
      },
      {
        path:'shehia',component:ShehiaComponent
      },
      {
        path:'business-size',component:BusinessSizeComponent
      },
      {
        path:'department',component:DepartmentComponent
      },
      {
        path:'view-member-info',
        component:ViewMemberInfoComponent
      }
      
      
      


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
