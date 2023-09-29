import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormGroupDirective,NgForm, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Patient } from 'src/models/patient';
import { AuthenticationService } from 'src/services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  PatientName!:FormControl;
  Gender!:FormControl;
  DOB!:FormControl;
  Email!:FormControl;
  Adress!:FormControl;  
  ContactNumber!:FormControl;
  GuardianName!:FormControl;
  GuardianContactNumber!:FormControl;
  Password!:FormControl;
  //image!:File;
  constructor(private authservice: AuthenticationService) { }
  patient: Patient = {
    PatientName: '',
    Gender: '',    
    DOB: new Date(),
    Email: '',
    Adress:'',    
    ContactNumber:'',
    GuardianName:'',
    GuardianContactNumber:'',
    Password: '',    
    // profilePic: new Uint8Array([]),
  };
  ngOnInit(): void {    
      this.PatientName=new FormControl('', [Validators.required]),
      this.Gender=new FormControl ('',[Validators.required]), 
      this.DOB=new FormControl('',[Validators.required]),
      this.Email=new FormControl('',[Validators.required]),
      this.Adress=new FormControl('',[Validators.required]),     
      this.ContactNumber=new FormControl('',[Validators.required]),
      this.GuardianName=new FormControl('',[Validators.required]),
      this.GuardianContactNumber=new FormControl('',[Validators.required]),
      this.Password=new FormControl('', [Validators.required, Validators.minLength(6)]),   
  
this.registrationForm= new FormGroup({
  PatientName: this.PatientName, 
  Email: this.Email, 
  DOB: this.DOB,
  Gender: this.Gender,
  ContactNumber: this.ContactNumber,
  Adress:this.Adress,
  GuardianName:this.GuardianName,
  GuardianContactNumber:this.GuardianContactNumber,
  Password: this.Password,  
});
  }
  onSubmit() {    
      console.log(this.registrationForm);
      this.authservice.postUserRegister(this.registrationForm.value);
    }
  }

