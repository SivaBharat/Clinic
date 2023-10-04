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
import { StaffAppointmentComponent } from './staff-appointment/staff-appointment.component';
import { TokenFormComponent } from './token-form/token-form.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { DoctorComponentComponent } from './doctor-component/doctor-component.component';
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
  {path:'staff-appointment',component:StaffAppointmentComponent},
  {path:'token-form',component:TokenFormComponent},
  {path:'appointment',component:PatientAppointmentComponent},
  {path:'doctor-appointment',component:DoctorComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
