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
      this.http
        .get<any[]>(`https://localhost:44324/api/AppointmentRequest1`)
        .subscribe((data) => {
          this.appointmentRequests = data;          
          this.fetchDepartmentAppointmentRequests();
        });
    });
  }

  fetchDepartmentAppointmentRequests() {
    this.http
      .get<any[]>('https://localhost:44324/api/AppointmentRequest1')
      .subscribe(
        (data) => {          
          this.appointmentRequests = data.filter((appointment) => appointment.patientId === this.userId);
          console.log(this.appointmentRequests);
          this.fetchDoctorDetails();
        },
        (error) => {
          console.error('Error fetching appointments:', error);       
        }
      );
  }


  fetchDoctorDetails() {    
    this.appointmentRequests.forEach((request) => {
      const doctorId = request.doctorId;      
      this.http
        .get<any>(`https://localhost:44324/api/Doctors/${doctorId}`)
        .subscribe((doctor) => {          
          this.doctorDetail.push(doctor);          
          this.fetchDepartmentDetails(doctor.deptId);
        });
    });
  }
  fetchDepartmentDetails(deptId: number) {   
    this.http
      .get<any>(`https://localhost:44324/api/Departments/${deptId}`)
      .subscribe((department) => {        
        const doctor = this.doctorDetail.find((doc) => doc.deptId === deptId);  
       
        if (doctor) {
          doctor.departmentName = department.deptName;
        }
      });
  }
    
  getDoctorName(doctorId: number): string {
    const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
    return doctor ? doctor.doctorName : 'N/A'; 
  }
  getDepartmentName(doctorId: number): string {
    const doctor = this.doctorDetail.find((doc) => doc.doctorId === doctorId);
    return doctor && doctor.departmentName ? doctor.departmentName : 'N/A';
  }
  
}
