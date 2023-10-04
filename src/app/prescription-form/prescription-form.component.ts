import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent {
  prescriptionForm!: FormGroup;
  userId: number | undefined;
  Diagnosis!: FormControl;
  Symptoms!: FormControl;
  Prescription!: FormControl;
  Remark!: FormControl;
  DeptId: number | undefined;
  patientId!: number;
  doctorId!: number;
  departmentDoctors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.getUserId().subscribe((userId: number | undefined) => {
      this.userId = userId;
      console.log('userId:', this.userId);
      this.fetchDepartmentDoctors();
    });

    this.prescriptionForm = this.formBuilder.group({
      Diagnosis: ['', Validators.required],
      Symptoms: ['', Validators.required],
      Prescription: ['', Validators.required],
      Remark: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.patientId = +params['patientId'];
      this.doctorId = +params['doctorId'];
    });
  }

  fetchDepartmentDoctors() {
    this.http
      .get<any[]>(`https://localhost:44324/api/Doctors`)
      .subscribe((data) => {
        // Filter doctors based on userId
        this.departmentDoctors = data.filter((doctor) => doctor.doctorId === this.userId);
        console.log(this.departmentDoctors);
        if (this.departmentDoctors.length > 0) {
          // Fetch department name based on the first doctor in the list (assuming they all have the same department)
          this.fetchDepartmentName(this.departmentDoctors[0].deptId);
        }
      });
  }

  fetchDepartmentName(deptId: number) {
    this.http
      .get<any>(`https://localhost:44324/api/Departments/${deptId}`)
      .subscribe((data) => {
        this.DeptId = data.deptId;
      });
  }

  submitToken() {
    const appointmentData = {
      PatientId: this.patientId,
      DoctorId: this.doctorId,
      DeptId: this.DeptId,
      Diagnosis: this.prescriptionForm.value.Diagnosis,
      Symptoms: this.prescriptionForm.value.Symptoms,
      Prescription: this.prescriptionForm.value.Prescription,
      Remark: this.prescriptionForm.value.Remark,
    };
    this.authService.postPrescription(appointmentData);
  }
}
