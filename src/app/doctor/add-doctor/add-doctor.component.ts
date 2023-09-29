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
  DoctorName!:FormControl;
  Gender!:FormControl;
  DOB!:FormControl;
  ContactNumber!:FormControl;
  Email!:FormControl;
  VisitingDays!:FormControl;
  DeptId!:FormControl;
  Address!:FormControl;
  Qualification!:FormControl;
  Password!:FormControl;
  departments: any[]=[];
  constructor(private http: HttpClient,private authservice: AuthenticationService) { }
  doctors: Doctor = {
    DoctorName: '',
    Gender: '',    
    DOB: new Date(),
    Email: '',
    Address:'',    
    ContactNumber:'',
    Qualification:'',
    VisitingDays:'',
    DeptId:0,
    Password: '',    
    // profilePic: new Uint8Array([]),
  };
  ngOnInit() {    
    this.http.get<any[]>('https://localhost:44324/api/Departments').subscribe((data) => {
      this.departments = data;
      console.log(data);
    });
      this.DoctorName=new FormControl('', [Validators.required]),
      this.Gender=new FormControl ('',[Validators.required]), 
      this.DOB=new FormControl('',[Validators.required]),
      this.Email=new FormControl('',[Validators.required]),
      this.Address=new FormControl('',[Validators.required]),     
      this.ContactNumber=new FormControl('',[Validators.required]),
      this.Qualification=new FormControl('',[Validators.required]),
      this.VisitingDays=new FormControl('',[Validators.required]),
      this.DeptId=new FormControl('',[Validators.required]),
      this.Password=new FormControl('', [Validators.required, Validators.minLength(6)])
      
      this.doctor= new FormGroup({
        DoctorName: this.DoctorName, 
        Email: this.Email, 
        DOB: this.DOB,
        Gender: this.Gender,
        ContactNumber: this.ContactNumber,
        Address:this.Address,
        Qualification:this.Qualification,
        VisitingDays:this.VisitingDays,
        DeptId:this.DeptId,
        Password: this.Password,  
      });
  }


  onSubmit() {
    console.log(this.doctor);
    this.authservice.postDoctorRegister(this.doctor.value);
  }
}
