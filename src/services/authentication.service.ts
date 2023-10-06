import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/models/patient';
import { Doctor } from 'src/models/doctor';
import { Staff } from 'src/models/staff';
import { Appointment } from 'src/models/appointment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import{environment}from 'src/environment/environments';
import { AppointmentRequest } from 'src/models/appointment-request';
import { Prescrioption } from 'src/models/prescrioption';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private roleIdSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private userIdSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private staffDeptIdSubject:BehaviorSubject<number | undefined>=new BehaviorSubject<number | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router,private messageService: MessageService) { }  
  getRoleId(): Observable<number | undefined> {
    return this.roleIdSubject.asObservable();
  }
  getUserId(): Observable<number | undefined> {
    return this.userIdSubject.asObservable();    
  }
  getStaffDeptId(){
     return this.staffDeptIdSubject.asObservable();
  }
  setRoleId(roleId: number | undefined) {
    this.roleIdSubject.next(roleId);
  }
  setUserId(userId: number | undefined) {
    this.userIdSubject.next(userId);
    console.log(userId);
  } 
  setStaffDeptId(departmentId:number | undefined){
    this.staffDeptIdSubject.next(departmentId);
    console.log(departmentId);
  }
  clearRoleId() {
    this.roleIdSubject.next(undefined);
  }   
  clearUserId() {
    this.userIdSubject.next(undefined);
  }
  clearStaffDeptId(){
    this.staffDeptIdSubject.next(undefined);
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Registered' });
  }
  showAppointment() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Token Provided Successfully' });
  }
  showAppointmentError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured during token provided' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured during register' });
  }
  showMedical() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mdeical record posted successfully..' });
  }
  showMailSuccess(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mail Sent Successfully' });
  }
  registerApi: string = environment.register;
  addDoctor:string=environment.doctor;
  addStaff:string=environment.staff;
  addAppointment:string=environment.appointment;
  addMedical:string=environment.medical;
  private appointmentRequestApiUrl = environment.appointmentRequest;

  createAppointmentRequest(request: AppointmentRequest) {
    return this.http.post<AppointmentRequest>(this.appointmentRequestApiUrl, request);
  }  
  postUserRegister(request: Patient) {
    return this.http.post<Patient>(this.registerApi, request).subscribe({
      next: (data) => {
        if (data) {          
          console.log(data);
        }
      },
      error: (err) => {
        console.log('error', err);
        this.showError();
        setTimeout(() => { this.router.navigate(['']); }, 1000);
      },
      complete: () => {
        this.showSuccess();
        setTimeout(() => { this.router.navigate(['login']); }, 1000);
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
        this.showError();
        setTimeout(() => { this.router.navigate(['']); }, 1000);
      },
      complete: () => {
        this.showSuccess();
        setTimeout(() => { this.router.navigate(['doctor']); }, 1000);
      },
    });
  }

  sendDoctormail(request: Doctor){
    return this.http.post<Doctor>(this.addDoctor + "/" + 'SendMail', request).subscribe({
    next: (data) => {
      if(data)
      console.log(data);
    },
    error: (err) => {
      console.log('error', err);
      this.showError();
      setTimeout(() => { this.router.navigate(['']); }, 1000);
    },
    complete: () => {
      this.showMailSuccess();
      setTimeout(() => { this.router.navigate(['doctor']); }, 1000);
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
        this.showError();
        setTimeout(() => { this.router.navigate(['']); }, 1000);
      },
      complete: () => {
        this.showSuccess();
        setTimeout(() => { this.router.navigate(['staff']); }, 1000);
      },
    });
  }  

  sendStaffmail(request: Staff){
    return this.http.post<Staff>(this.addStaff + "/" + 'SendMail', request).subscribe({
    next: (data) => {
      if(data)
      console.log(data);
    },
    error: (err) => {
      console.log('error', err);
      this.showError();
      setTimeout(() => { this.router.navigate(['']); }, 1000);
    },
    complete: () => {
      this.showMailSuccess();
      setTimeout(() => { this.router.navigate(['staff']); }, 1000);
    },
  });
  }

  
  postAppointment(request: Appointment) {
    return this.http.post<Appointment>(this.addAppointment, request).subscribe({
      next: (data) => {
        if(data)
        console.log(data);      
      },
      error: (err) => {
        console.log('error', err);
        this.showAppointmentError();
        setTimeout(() => { this.router.navigate(['']); }, 1000);
      },
      complete: () => {
        this.showSuccess();
        setTimeout(() => { this.router.navigate(['']); }, 1000);
      },
    });
  }    

  postPrescription(request: Prescrioption) {
    return this.http.post<Prescrioption>(this.addMedical, request).subscribe({
      next: (data) => {
        if(data)
        console.log(data);
      },
      error: (err) => {
        console.log('error', err);
        this.showError();
        setTimeout(() => { this.router.navigate(['']); }, 1000);
      },
      complete: () => {
        this.showMedical();
        setTimeout(() => { this.router.navigate(['']); }, 1000);
      },
    });
  }  
}
