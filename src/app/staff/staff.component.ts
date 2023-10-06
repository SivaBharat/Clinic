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
  editedRecord: any = null;
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

  editRecord(record: any) {
    this.editedRecord = { ...record }; 
  }

  updateRecord() {
    if (this.editedRecord) {
      const staffId = this.editedRecord.staffId;
      this.http.put(`https://localhost:44324/api/Staffs/${staffId}`, this.editedRecord)
        .subscribe(() => {          
          const index = this.staffs.findIndex((r) => r.staffId === staffId);
          if (index !== -1) {
            this.staffs[index] = this.editedRecord;
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
    const staffId = record.staffId; 
    this.http.delete(`https://localhost:44324/api/staffs/${staffId}`)
      .subscribe(() => {        
        this.staffs = this.staffs.filter((r) => r.staffId !== staffId);
      });
  }
  
}
