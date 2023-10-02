import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/models/patient';
import { Doctor } from 'src/models/doctor';
import { Staff } from 'src/models/staff';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import{environment}from 'src/environment/environments';
import { AppointmentRequest } from 'src/models/appointment-request';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private roleIdSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private userIdSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  constructor(private http: HttpClient, private router: Router) { }  

  getRoleId(): Observable<number | undefined> {
    return this.roleIdSubject.asObservable();
  }
  getUserId(): Observable<number | undefined> {
    return this.userIdSubject.asObservable();    
  }
  setRoleId(roleId: number | undefined) {
    this.roleIdSubject.next(roleId);
  }
  setUserId(userId: number | undefined) {
    this.userIdSubject.next(userId);
    console.log(userId);
  } 
  clearRoleId() {
    this.roleIdSubject.next(undefined);
  }   
  clearUserId() {
    this.userIdSubject.next(undefined);
  }
  registerApi: string = environment.register;
  addDoctor:string=environment.doctor;
  addStaff:string=environment.staff;
  private appointmentRequestApiUrl = environment.appointmentRequest;

  createAppointmentRequest(request: AppointmentRequest) {
    return this.http.post<AppointmentRequest>(this.appointmentRequestApiUrl, request);
  }

  postUserRegister(request: Patient) {
    return this.http.post<Patient>(this.registerApi, request).subscribe({
      next: (data) => {
        if(data)
        console.log(data);      
      },
      error: (err) => {
        console.log('error', err);
        alert('error');
        this.router.navigateByUrl('');
      },
      complete: () => {
        alert('Success'); 
        this.router.navigateByUrl('login');
      },
    });
  }

  postDoctorRegister(request: Doctor) {
    return this.http.post<Doctor>(this.addDoctor, request).subscribe({
      next: (data) => {
        if(data)
        console.log(data);
      },
      error: (err) => {
        console.log('error', err);
        alert('error');
        this.router.navigateByUrl('');
      },
      complete: () => {
        alert('Success'); 
        this.router.navigateByUrl('doctor');
      },
    });
  }

  postStaffRegister(request: Staff) {
    return this.http.post<Staff>(this.addStaff, request).subscribe({
      next: (data) => {
        if(data)
        console.log(data);
      },
      error: (err) => {
        console.log('error', err);
        alert('error');
        this.router.navigateByUrl('');
      },
      complete: () => {
        alert('Success'); 
        this.router.navigateByUrl('staff');
      },
    });
  }  
}
