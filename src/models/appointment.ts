export interface Appointment{
    AppointmentRequestID:number;
    PatientId:number;
    DoctorId:number;
    AppointmentProvidedDate:Date;
    TokenNumber:number; 
    DeptId:number|undefined;              
}