// admin-record.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-record',
  templateUrl: './admin-record.component.html',
  styleUrls: ['./admin-record.component.css']
})
export class AdminRecordComponent implements OnInit {
  userId!: number | undefined;
  patientRecord: any[] = [];
  doctorDetail: any[] = [];
  patientDetail: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {  
    this.authService.getUserId().subscribe((userId: number | undefined) => {
      this.userId = userId;
      console.log('userId:', this.userId);  
      this.fetchAppointments();      
    });  
  }

  fetchAppointments() {
    this.http.get<any[]>('https://localhost:44324/api/MedicalRecords').subscribe((data) => {
      this.patientRecord = data; // Store the fetched data in the patientRecord array
      console.log(data);
      this.fetchDoctorAndPatientDetails(); // Fetch doctor and patient details once appointments are loaded
    });
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

      // Fetch patient details for the current appointment request
      this.http
        .get<any>(`https://localhost:44324/api/Patients/${patientId}`)
        .subscribe((patient) => {        
          this.patientDetail.push(patient);
        });
    });
  }

  getDoctorName(doctorId: number): string {
    const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
    return doctor ? doctor.doctorName : 'N/A'; // Return the doctor's name or 'N/A' if not found
  }

  getPatientName(patientId: number): string {
    const patient = this.patientDetail.find((pat) => pat.patientId === patientId);
    return patient ? patient.patientName : 'N/A'; // Return the patient's name or 'N/A' if not found
  }
}
