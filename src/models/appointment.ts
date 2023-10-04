import { Time } from "@angular/common";
export interface Appointment{
    AppointmentRequestID:number;
    PatientId:number;
    DoctorId:number;
    AppointmentProvidedDate:Date;
    TokenNumber:number;               
}