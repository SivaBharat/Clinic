import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { Doctor } from 'src/models/doctor';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  doctor!: FormGroup;
  DoctorName!: FormControl;
  Gender!: FormControl;
  DOB!: FormControl;
  ContactNumber!: FormControl;
  Email!: FormControl;
  VisitingDays!: FormControl;
  DeptId!: FormControl;
  Address!: FormControl;
  Qualification!: FormControl;
  DoctorImg!:FormControl;
  imgPath:string='';
  showImg:boolean=true;
  public response:any={dbPath:''};
  Password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  departments: any[] = [];

  constructor(private http: HttpClient, private authservice: AuthenticationService) {}

  doctors: Doctor = {
    DoctorName: '',
    Gender: '',
    DOB: new Date(),
    Email: '',
    Address: '',
    ContactNumber: '',
    Qualification: '',
    VisitingDays: '',
    DeptId: 0,
    Password: '',
    DoctorImg:''
  };

  ngOnInit() {
    // Generate a random password when the form is initialized
    this.generateRandomPassword();

    this.http.get<any[]>('https://localhost:44324/api/Departments').subscribe((data) => {
      this.departments = data;
      console.log(data);
    });

    this.DoctorName = new FormControl('', [Validators.required, Validators.pattern('[A-Za-z. ]*')]);
    this.Gender = new FormControl('', [Validators.required]);
    this.DOB = new FormControl('', [Validators.required]);
    this.Email = new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.Address = new FormControl('', [Validators.required,Validators.pattern('^(?=.{5,100})[A-Za-z0-9\s.,-]*$')]);
    this.ContactNumber = new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]);
    this.Qualification = new FormControl('', [Validators.required,Validators.pattern('[A-Za-z. ]*')]);
    this.VisitingDays = new FormControl('', [Validators.required,Validators.pattern('[A-Za-z. ]*')]);
    this.DeptId = new FormControl('', [Validators.required]);
    this.DoctorImg= new FormControl('',[Validators.required]);

    this.doctor = new FormGroup({
      DoctorName: this.DoctorName,
      Email: this.Email,
      DOB: this.DOB,
      Gender: this.Gender,
      ContactNumber: this.ContactNumber,
      Address: this.Address,
      Qualification: this.Qualification,
      VisitingDays: this.VisitingDays,
      DeptId: this.DeptId,
      Password: this.Password,
      DoctorImg:this.DoctorImg,
    });
  }

  // Function to generate a random password
  generateRandomPassword() {
    const randomPassword = Math.random().toString(36).slice(-8);
    this.Password.setValue(randomPassword);
  }

  onSubmit() {
    console.log(this.doctor);
    this.authservice.postDoctorRegister(this.doctor.value);
  }
  public uploadFinished=(event:any)=>{
    this.response = event;
    this.DoctorImg.setValue(this.response.dbPath);
    this.showImg = false;
    this.imgPath= `https://localhost:44324/${this.response.dbPath}`
  }
}
