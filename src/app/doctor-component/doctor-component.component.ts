import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-doctor-component',
  templateUrl: './doctor-component.component.html',
  styleUrls: ['./doctor-component.component.css']
})
export class DoctorComponentComponent {
  userId!: number | undefined;
  doctorAppointment: any[] = [];
  patientDetail: any[] = [];
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
          this.doctorAppointment = data.filter((appointment) => appointment.doctorId === this.userId);
          console.log(this.doctorAppointment);
          this.fetchDoctorAndPatientDetails();
        },
        (error) => {
          console.error('Error fetching appointments:', error);       
        }
      );
  }
  fetchDoctorAndPatientDetails() {
    this.doctorAppointment.forEach((request) => {
      const patientId = request.patientId;      
      this.http
        .get<any>(`https://localhost:44324/api/Patients/${patientId}`)
        .subscribe((doctor) => {        
          this.patientDetail.push(doctor);
        });   
    });
  }
  getPatientName(patientId: number): string {
    const doctor = this.patientDetail.find((doc) => doc.patientId === patientId);
    return doctor ? doctor.patientName : 'N/A'; 
  }
  redirectToPrescriptionForm(patientId: number, doctorId: number) {    
    this.router.navigate(['/prescription-form', { patientId, doctorId}]);
  } 
}
