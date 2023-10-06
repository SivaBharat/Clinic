import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { Staff } from 'src/models/staff';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  staff!: FormGroup;
  StaffName!:FormControl;
  Gender!:FormControl;
  DOB!:FormControl;
  ContactNumber!:FormControl;
  Email!:FormControl;  
  DeptId!:FormControl;
  Address!:FormControl; 
  Position!:FormControl;
  Password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  departments: any[]=[];
  StaffImg!:FormControl;
  imgPath:string='';
  showImg:boolean=true;
  public response:any={dbPath:''};
  constructor(private http: HttpClient,private authservice: AuthenticationService) { }
  staffs: Staff = {
    StaffName: '',
    Gender: '',    
    DOB: new Date(),
    Email: '',
    Address:'',    
    ContactNumber:'',  
    DeptId:0,
    Position:'',
    Password:'',    
    StaffImg:'',
  };
  ngOnInit() {    
    this.generateRandomPassword();

    this.http.get<any[]>('https://localhost:44324/api/Departments').subscribe((data) => {
      this.departments = data;
      console.log(data);
    });
      this.StaffName=new FormControl('', [Validators.required,Validators.pattern('[A-Za-z. ]*')]),
      this.Gender=new FormControl ('',[Validators.required]), 
      this.DOB=new FormControl('',[Validators.required]),
      this.Email=new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      this.Address=new FormControl('',[Validators.required,Validators.pattern('^(?=.{5,100})[A-Za-z0-9\s.,-]*$')]),     
      this.ContactNumber=new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
      this.Position=new FormControl('',[Validators.required]),      
      this.DeptId=new FormControl('',[Validators.required])
      this.StaffImg= new FormControl('',[Validators.required]);
      
      this.staff= new FormGroup({
        StaffName: this.StaffName, 
        Email: this.Email, 
        DOB: this.DOB,
        Gender: this.Gender,
        ContactNumber: this.ContactNumber,
        Address:this.Address,
        Position:this.Position,        
        DeptId:this.DeptId,
        Password: this.Password,  
        StaffImg:this.StaffImg,
      });
  }

  generateRandomPassword() {
    const randomPassword = Math.random().toString(36).slice(-8);
    this.Password.setValue(randomPassword);
  }

  onSubmit() {
    console.log(this.staff);
    this.authservice.postStaffRegister(this.staff.value);
    this.authservice.sendDoctormail(this.staff.value);
  }
  public uploadFinished=(event:any)=>{
    this.response = event;
    this.StaffImg.setValue(this.response.dbPath);
    this.showImg = false;
    this.imgPath= `https://localhost:44324/${this.response.dbPath}`
  }
}