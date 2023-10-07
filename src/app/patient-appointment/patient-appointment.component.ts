import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit { 
  userId!: number | undefined;
  patientAppointment: any[] = [];
  doctorDetail: any[] = [];
  constructor(private authService: AuthenticationService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {}

  ngOnInit() {  
    this.authService.getUserId().subscribe((userId: number | undefined) => {
      this.userId = userId;
      console.log('userId:',this.userId);  
      this.fetchAppointments();      
  });  
}
fetchAppointments() {
  this.http
    .get<any[]>('https://localhost:44324/api/Appointments')
    .subscribe(
      (data) => {        
        this.patientAppointment = data.filter((appointment) => appointment.patientId === this.userId);
        console.log(this.patientAppointment);
        this.fetchDoctorAndPatientDetails();
      },
      (error) => {
        console.error('Error fetching appointments:', error);       
      }
    );
}
fetchDoctorAndPatientDetails() {
  this.patientAppointment.forEach((request) => {
    const doctorId = request.doctorId;   
    this.http
      .get<any>(`https://localhost:44324/api/Doctors/${doctorId}`)
      .subscribe((doctor) => {        
        this.doctorDetail.push(doctor);
      });   
  });
}
getDoctorName(doctorId: number): string {
  const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
  return doctor ? doctor.doctorName : 'N/A'; 
}
}