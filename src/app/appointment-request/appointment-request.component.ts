import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { AppointmentRequest } from 'src/models/appointment-request';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.css']
})
export class AppointmentRequestComponent implements OnInit {
  userId: number | undefined;
  appointmentRequests: any[] = [];
  doctorDetail: any[] = [];

  constructor(
    private http: HttpClient,
    private appointmentRequestService: AuthenticationService
  ) {}

  ngOnInit() {
    this.appointmentRequestService.getUserId().subscribe((userId: number | undefined) => {
      this.userId = userId;
      console.log('userId:', this.userId);

      // Fetch appointment requests for the specific patient
      this.http
        .get<any[]>(`https://localhost:44324/api/AppointmentRequest1?patientId=${this.userId}`)
        .subscribe((data) => {
          this.appointmentRequests = data;

          // Fetch doctor details for each appointment request
          this.fetchDoctorDetails();
        });
    });
  }

  fetchDoctorDetails() {
    // Assuming doctorId is a property in each appointment request
    this.appointmentRequests.forEach((request) => {
      const doctorId = request.doctorId;
  
      // Fetch doctor details for the current appointment request
      this.http
        .get<any>(`https://localhost:44324/api/Doctors/${doctorId}`)
        .subscribe((doctor) => {
          // Add the doctor details to the doctorDetail array
          this.doctorDetail.push(doctor);
  
          // Fetch department details for the doctor's department
          this.fetchDepartmentDetails(doctor.deptId);
        });
    });
  }
  fetchDepartmentDetails(deptId: number) {
    // Fetch department details for the specified department
    this.http
      .get<any>(`https://localhost:44324/api/Departments/${deptId}`)
      .subscribe((department) => {
        // Find the doctor in the doctorDetail array
        const doctor = this.doctorDetail.find((doc) => doc.deptId === deptId);
  
        // Add the department name to the doctor object
        if (doctor) {
          doctor.departmentName = department.deptName;
        }
      });
  }
    
  getDoctorName(doctorId: number): string {
    const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
    return doctor ? doctor.doctorName : 'N/A'; // Return the doctor's name or 'N/A' if not found
  }
  getDepartmentName(doctorId: number): string {
    const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
    return doctor && doctor.departmentName ? doctor.departmentName : 'N/A';
  }
  
}
