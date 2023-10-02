import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorComponent } from './doctor/doctor.component';
import { StaffComponent } from './staff/staff.component';
import { AddDoctorComponent } from './doctor/add-doctor/add-doctor.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentDoctorComponent } from './department-doctor/department-doctor.component';
import { AppointmentRequestComponent } from './appointment-request/appointment-request.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'doctor',component:DoctorComponent},
  {path:'staff',component:StaffComponent},
  {path:'doctor/adddoctor',component:AddDoctorComponent},
  {path:'addstaff',component:AddStaffComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'department',component:DepartmentComponent},
  { path: 'department-doctor/:deptId', component: DepartmentDoctorComponent },
  {path:'appointment-request',component:AppointmentRequestComponent},
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
