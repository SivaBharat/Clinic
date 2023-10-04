// admin-record.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-staff-record',
  templateUrl: './staff-record.component.html',
  styleUrls: ['./staff-record.component.css']
})
export class StaffRecordComponent implements OnInit {
  userId!: number | undefined;
  staffDeptId:number | undefined;
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
    this.authService.getStaffDeptId().subscribe((departmentId: number | undefined) => {
      this.staffDeptId = departmentId;
     console.log(this.staffDeptId);
      this.fetchAppointments();      
    });  
  }

  fetchAppointments() {
    this.http
      .get<any[]>('https://localhost:44324/api/MedicalRecords')
      .subscribe(
        (data) => {
          // Filter Appointments based on PatientId
          this.patientRecord = data.filter((appointment) => appointment.deptId === this.staffDeptId);
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
