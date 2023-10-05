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
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { DoctorRecordComponent } from './doctor-record/doctor-record.component';
import { StaffRecordComponent } from './staff-record/staff-record.component';
import { AdminRecordComponent } from './admin-record/admin-record.component';
import { UploadComponent } from './upload/upload.component';
import { ButtonModule } from 'primeng/button';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    PrescriptionFormComponent,
    PatientRecordComponent,
    DoctorRecordComponent,
    StaffRecordComponent,
    AdminRecordComponent,
    UploadComponent,      
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
    MatInputModule,
    ButtonModule,
    ToastModule,   
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
