import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
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
  PatientImg!:FormControl;
  imgPath:string='';
  showImg:boolean=true;
  public response:any={dbPath:''};  
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
    PatientImg:'',     
  };
  ngOnInit(): void {    
      this.PatientName=new FormControl('', [Validators.required, Validators.pattern('[A-Za-z. ]*')]),
      this.Gender=new FormControl ('',[Validators.required]), 
      this.DOB=new FormControl('',[Validators.required]),
      this.Email=new FormControl('',
      [Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      this.Adress=new FormControl('',[Validators.required, Validators.pattern('^(?=.{5,100})[A-Za-z0-9\s.,-]*$')]),     
      this.ContactNumber=new FormControl('',[Validators.required, Validators.pattern('[0-9]*')]),
      this.GuardianName=new FormControl('',[Validators.required, Validators.pattern('[A-Za-z. ]*')]),
      this.GuardianContactNumber=new FormControl('',[Validators.required, Validators.pattern('[0-9]*')]),
      this.Password=new FormControl('', 
      [ Validators.required,
        Validators.minLength(6),
        Validators.maxLength(14),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}')]),   
      this.PatientImg= new FormControl('',[Validators.required]);

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
  PatientImg:this.PatientImg, 
});
  }
  onSubmit() {    
      console.log(this.registrationForm);
      this.authservice.postUserRegister(this.registrationForm.value);
    }

    public uploadFinished=(event:any)=>{
      this.response = event;
      this.PatientImg.setValue(this.response.dbPath);
      this.showImg = false;
      this.imgPath= `https://localhost:44324/${this.response.dbPath}`
    }
  }

