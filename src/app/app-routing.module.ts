import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorComponent } from './doctor/doctor.component';
import { StaffComponent } from './staff/staff.component';
import { AddDoctorComponent } from './doctor/add-doctor/add-doctor.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { HomeComponent } from './home/home.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentDoctorComponent } from './department-doctor/department-doctor.component';
import { AppointmentRequestComponent } from './appointment-request/appointment-request.component';
import { StaffAppointmentComponent } from './staff-appointment/staff-appointment.component';
import { TokenFormComponent } from './token-form/token-form.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { DoctorComponentComponent } from './doctor-component/doctor-component.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { DoctorRecordComponent } from './doctor-record/doctor-record.component';
import { AdminRecordComponent } from './admin-record/admin-record.component';
import { StaffRecordComponent } from './staff-record/staff-record.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'doctor',component:DoctorComponent},
  {path:'staff',component:StaffComponent},
  {path:'doctor/adddoctor',component:AddDoctorComponent},
  {path:'staff/addstaff',component:AddStaffComponent},
  {path:'',component:HomeComponent},  
  {path:'department',component:DepartmentComponent},
  { path: 'department-doctor/:deptId', component: DepartmentDoctorComponent },
  {path:'appointment-request',component:AppointmentRequestComponent},
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
  {path:'staff-appointment',component:StaffAppointmentComponent},
  {path:'token-form',component:TokenFormComponent},
  {path:'appointment',component:PatientAppointmentComponent},
  {path:'doctor-appointment',component:DoctorComponentComponent},
  {path:'prescription-form',component:PrescriptionFormComponent},
  {path:'patient-records',component:PatientRecordComponent},
  {path:'doctor-record',component:DoctorRecordComponent},
  {path:'admin-records',component:AdminRecordComponent},
  {path:'staff-record',component:StaffRecordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
