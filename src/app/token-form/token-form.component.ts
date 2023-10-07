import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-token-form',
  templateUrl: './token-form.component.html',
  styleUrls: ['./token-form.component.css'],
})
export class TokenFormComponent implements OnInit {
  tokenForm!: FormGroup;
  AppointmentProvidedDate!:FormControl;  
  TokenNumber!:FormControl;
  patientId!: number;
  doctorId!: number;
  appointmentRequestId!: number; 
  patientDetail:any[]=[];
  staffDeptId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.getStaffDeptId().subscribe((departmentId: number | undefined) => {
      this.staffDeptId = departmentId;
     console.log(this.staffDeptId);
    });
    this.tokenForm = this.formBuilder.group({
      AppointmentProvidedDate: ['', Validators.required],     
      TokenNumber: [null, Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.patientId = +params['patientId'];
      this.doctorId = +params['doctorId'];
      this.appointmentRequestId = +params['appointmentRequestId'];      
    });    
  }   

  submitToken() {
    const appointmentData = {
      PatientId: this.patientId,
      DoctorId: this.doctorId,
      AppointmentRequestID: this.appointmentRequestId,      
      AppointmentProvidedDate: this.tokenForm.value.AppointmentProvidedDate,
      TokenNumber: this.tokenForm.value.TokenNumber,     
      DeptId:this.staffDeptId,             
    };      
      this.authService.postAppointment(appointmentData);         
  }  
}