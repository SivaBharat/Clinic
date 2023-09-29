import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorComponent } from './doctor/doctor.component';
import { StaffComponent } from './staff/staff.component';
import { AddDoctorComponent } from './doctor/add-doctor/add-doctor.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'doctor',component:DoctorComponent},
  {path:'staff',component:StaffComponent},
  {path:'adddoctor',component:AddDoctorComponent},
  {path:'addstaff',component:AddStaffComponent},
  {path:'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
