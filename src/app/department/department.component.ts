import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  departments: any[]=[];
  constructor(private http: HttpClient,private authservice: AuthenticationService) { }
  ngOnInit() {
     this.http.get<any[]>('https://localhost:44324/api/Departments').subscribe((data) => {
     this.departments = data;
      console.log(data);
    });
  }
}
