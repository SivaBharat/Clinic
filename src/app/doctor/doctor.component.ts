import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment}from 'src/environment/environments';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: any[] = [];
  departments:any[]=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {    
    this.http.get(environment.doctor).subscribe((data: any) => {
      this.doctors = data;
    });
    this.http.get('https://localhost:44324/api/Departments').subscribe((data: any) => {
      this.departments = data;
    });
  }
  getDepartmentName(deptId: number): string {
    const department = this.departments.find((dept) => dept.deptId === deptId);
    return department ? department.deptName : 'Unknown'; 
  }
  
}
