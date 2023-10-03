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
    // Fetch the staff's department ID
    this.authService.getStaffDeptId().subscribe((departmentId: number | undefined) => {
      this.staffDeptId = departmentId;
     console.log(this.staffDeptId);
      // Fetch department-specific appointment requests
      this.fetchDepartmentAppointmentRequests();
    });
  }

  fetchDepartmentAppointmentRequests() {
    if (this.staffDeptId) {
      this.http
        .get<any[]>(`https://localhost:44324/api/AppointmentRequest1?deptId=${this.staffDeptId}`)
        .subscribe((data) => {
          this.departmentAppointmentRequests = data;
          console.log(data);
          console.log(this.staffDeptId);  
          this.fetchDoctorAndPatientDetails();
        });
    }
  }

  fetchDoctorAndPatientDetails() {
    this.departmentAppointmentRequests.forEach((request) => {
      const doctorId = request.doctorId;
      const patientId = request.patientId;

      // Fetch doctor details for the current appointment request
      this.http
        .get<any>(`https://localhost:44324/api/Doctors/${doctorId}`)
        .subscribe((doctor) => {
          // Add the doctor details to the doctorDetail array
          this.doctorDetail.push(doctor);
        });

      // Fetch patient details for the current appointment request
      this.http
        .get<any>(`https://localhost:44324/api/Patients/${patientId}`)
        .subscribe((patient) => {
          // Add the patient details to the patientDetail array
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
  redirectToTokenForm(patientId: number, doctorId: number, appointmentRequestId: number) {
    // Redirect to the TokenFormComponent when the "Give Token" button is clicked
    this.router.navigate(['/token-form', { patientId, doctorId, appointmentRequestId }]);
  }  
}
