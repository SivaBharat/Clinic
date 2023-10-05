import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment}from 'src/environment/environments';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffs: any[] = [];
  departments:any[]=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {    
    this.http.get(environment.staff).subscribe((data: any) => {
      this.staffs = data;
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
