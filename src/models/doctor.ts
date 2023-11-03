export interface Doctor {
    DoctorName:string;
    Gender:string;
    DOB:Date;
    ContactNumber:string;
    Address:string;
    Email:string;
    Qualification:string;
    DeptId:number;
    VisitingDays:string;
    Password:string;
    DoctorImg:string;
}
export interface TokenDetails {
    accessToken: string,
    refreshToken: string
}