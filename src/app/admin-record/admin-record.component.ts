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
  editedRecord: any = null;
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
      this.patientRecord = data; 
      console.log(data);
      this.fetchDoctorAndPatientDetails(); 
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

  editRecord(record: any) {
    this.editedRecord = { ...record }; 
  }

  updateRecord() {
    if (this.editedRecord) {
      const recordId = this.editedRecord.recordId;
      this.http.put(`https://localhost:44324/api/MedicalRecords/${recordId}`, this.editedRecord)
        .subscribe(() => {          
          const index = this.patientRecord.findIndex((r) => r.recordId === recordId);
          if (index !== -1) {
            this.patientRecord[index] = this.editedRecord;
          }          
          this.editedRecord = null;
        });
    }
  }

  confirmDelete(record: any) {
    const confirmation = window.confirm('Are you sure you want to delete this record?');
    if (confirmation) {      
      this.deleteRecord(record);
    }
  }
 
  deleteRecord(record: any) {
    const recordId = record.recordId; 
    this.http.delete(`https://localhost:44324/api/MedicalRecords/${recordId}`)
      .subscribe(() => {        
        this.patientRecord = this.patientRecord.filter((r) => r.recordId !== recordId);
      });
  }

  getDoctorName(doctorId: number): string {
    const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
    return doctor ? doctor.doctorName : 'N/A';
  }

  getPatientName(patientId: number): string {
    const patient = this.patientDetail.find((pat) => pat.patientId === patientId);
    return patient ? patient.patientName : 'N/A'; 
  }
}
