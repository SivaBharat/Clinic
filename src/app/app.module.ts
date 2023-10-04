import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AddDoctorComponent } from './doctor/add-doctor/add-doctor.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { DoctorComponent } from './doctor/doctor.component';
import { StaffComponent } from './staff/staff.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentDoctorComponent } from './department-doctor/department-doctor.component';
import { AppointmentRequestComponent } from './appointment-request/appointment-request.component';
import { StaffAppointmentComponent } from './staff-appointment/staff-appointment.component';
import { TokenFormComponent } from './token-form/token-form.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { DoctorComponentComponent } from './doctor-component/doctor-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    AddDoctorComponent,
    AddStaffComponent,
    DoctorComponent,
    StaffComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    DepartmentComponent,
    DepartmentDoctorComponent,
    AppointmentRequestComponent,
    StaffAppointmentComponent,
    TokenFormComponent,
    PatientAppointmentComponent,
    DoctorComponentComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
