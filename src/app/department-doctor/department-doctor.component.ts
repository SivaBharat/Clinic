import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { AppointmentRequest } from 'src/models/appointment-request';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-department-doctor',
  templateUrl: './department-doctor.component.html',
  styleUrls: ['./department-doctor.component.css'],
})
export class DepartmentDoctorComponent implements OnInit {
  departmentId!: number;
  departmentName!: string;
  departmentDoctors: any[] = [];
  loggedInPatient: any; 
  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private appointmentRequestService: AuthenticationService,   
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.departmentId = +params.get('deptId')!; 
      console.log(this.departmentId);      
      this.fetchDepartmentDoctors();      
      this.appointmentRequestService.getUserId().subscribe((userId: number | undefined) => {
        this.userId = userId;
        console.log('userId:',this.userId);
      });
    });
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appiontment sent Successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured during Appointment sent' });
  } 
  fetchDepartmentDoctors() {
    this.http
      .get<any[]>(`https://localhost:44324/api/Doctors`)
      .subscribe((data) => {        
        this.departmentDoctors = data.filter((doctor) => doctor.deptId === this.departmentId);
        console.log(this.departmentDoctors);
      });   
    this.fetchDepartmentName();
  }  
  fetchDepartmentName() {
    this.http
      .get<any>(`https://localhost:44324/api/Departments/${this.departmentId}`)
      .subscribe((data) => {
        this.departmentName = data.deptName;
      });
  }
  openAppointmentModal(doctor: any) {
    if (!this.userId) {     
      alert('Please log in to make an appointment.');
      return;
    }       
    if (confirm(`Are you sure you want to make an appointment with Dr. ${doctor.doctorName}?`)) {
      const request: AppointmentRequest = {
        PatientId: this.userId,
        DoctorId: doctor.doctorId,
        DeptId:doctor.deptId,
        RequestDate: new Date(),
      };     
      this.appointmentRequestService.createAppointmentRequest(request).subscribe(
        (response) => {          
          this.showSuccess();
          setTimeout(() => { this.router.navigate(['']); }, 1000);
        },
        (error) => {          
          console.error('Error sending appointment request:', error);
          this.showError();          
        }
      );
    }
  }
}
