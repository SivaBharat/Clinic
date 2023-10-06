import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environments';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: any[] = [];
  departments: any[] = [];
  editedRecord: any = null;
  searchText: string = '';

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

  editRecord(record: any) {
    this.editedRecord = { ...record };
  }

  updateRecord() {
    if (this.editedRecord) {
      const doctorId = this.editedRecord.doctorId;
      this.http.put(`https://localhost:44324/api/Doctors/${doctorId}`, this.editedRecord)
        .subscribe(() => {
          const index = this.doctors.findIndex((r) => r.doctorId === doctorId);
          if (index !== -1) {
            this.doctors[index] = this.editedRecord;
          }
          this.editedRecord = null;
        });
    }
  }

  confirmDelete(record: any) {
    const confirmation = window.confirm('Are you sure you want to delete this record?');
    if (confirmation) {
      this.deleteRecord(record);
    }
  }

  deleteRecord(record: any) {
    const doctorId = record.doctorId;
    this.http.delete(`https://localhost:44324/api/Doctors/${doctorId}`)
      .subscribe(() => {
        this.doctors = this.doctors.filter((r) => r.doctorId !== doctorId);
      });
  }
}
