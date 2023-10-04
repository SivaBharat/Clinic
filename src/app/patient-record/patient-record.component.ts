import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { Prescrioption } from 'src/models/prescrioption';
import { Router } from '@angular/router'

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent {
  userId!: number | undefined;
  patientRecord: any[] = [];
  doctorDetail: any[] = [];
  patientDetail:any[]=[];
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
    .get<any[]>('https://localhost:44324/api/MedicalRecords')
    .subscribe(
      (data) => {
        // Filter Appointments based on PatientId
        this.patientRecord = data.filter((appointment) => appointment.patientId === this.userId);
        console.log(this.patientRecord);
        this.fetchDoctorAndPatientDetails();
      },
      (error) => {
        console.error('Error fetching appointments:', error);       
      }
    );
}
fetchDoctorAndPatientDetails() {
  this.patientRecord.forEach((request) => {
    const doctorId = request.doctorId;   
    const patientId = request.patientId; 
    // Fetch doctor details for the current appointment request
    this.http
      .get<any>(`https://localhost:44324/api/Doctors/${doctorId}`)
      .subscribe((doctor) => {        
        this.doctorDetail.push(doctor);
      }); 
      this.http
      .get<any>(`https://localhost:44324/api/Patients/${patientId}`)
      .subscribe((doctor) => {        
        this.patientDetail.push(doctor);
      });   
  });
}
getDoctorName(doctorId: number): string {
  const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
  return doctor ? doctor.doctorName : 'N/A'; // Return the doctor's name or 'N/A' if not found
}
getPatientName(patientId: number): string {
  const doctor = this.patientDetail.find((doc) => doc.patientId === patientId);
  return doctor ? doctor.patientName : 'N/A'; // Return the doctor's name or 'N/A' if not found
}
}
