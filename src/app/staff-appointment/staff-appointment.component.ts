import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-staff-appointment',
  templateUrl: './staff-appointment.component.html',
  styleUrls: ['./staff-appointment.component.css']
})
export class StaffAppointmentComponent implements OnInit {
  staffDeptId: number | undefined;
  departmentAppointmentRequests: any[] = [];
  doctorDetail: any[] = [];
  patientDetail: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router   
  ) {}

  ngOnInit() {   
    this.authService.getStaffDeptId().subscribe((departmentId: number | undefined) => {
      this.staffDeptId = departmentId;
     console.log(this.staffDeptId);      
      this.fetchDepartmentAppointmentRequests();
    });
  }
  
  fetchDepartmentAppointmentRequests() {
    this.http
      .get<any[]>('https://localhost:44324/api/AppointmentRequest1')
      .subscribe(
        (data) => {         
          this.departmentAppointmentRequests = data.filter((appointment) => appointment.deptId === this.staffDeptId);
          console.log(this.departmentAppointmentRequests);
          this.fetchDoctorAndPatientDetails();
        },
        (error) => {
          console.error('Error fetching appointments:', error);       
        }
      );
  }

  fetchDoctorAndPatientDetails() {
    this.departmentAppointmentRequests.forEach((request) => {
      const doctorId = request.doctorId;
      const patientId = request.patientId;
      
      this.http
        .get<any>(`https://localhost:44324/api/Doctors/${doctorId}`)
        .subscribe((doctor) => {          
          this.doctorDetail.push(doctor);
        });
      
      this.http
        .get<any>(`https://localhost:44324/api/Patients/${patientId}`)
        .subscribe((patient) => {          
          this.patientDetail.push(patient);          
        });
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
  redirectToTokenForm(patientId: number, doctorId: number, appointmentRequestId: number) {   
    this.router.navigate(['/token-form', { patientId, doctorId, appointmentRequestId }]);
  }  
}
