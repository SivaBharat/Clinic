import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environment/environments';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {
  constructor(private http:HttpClient){}
  public progress!:number;
  public message!:string;
  @Output() public onUploadFinished = new EventEmitter();
  public uploadFile =(files:any)=>{
    if(files.length===0)
    return;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.http.post(environment.fileUpload,formData,{reportProgress:true,observe:'events'})
    .subscribe(event=>{
      if(event.type===HttpEventType.UploadProgress){
        this.progress = Math.round(100* event.loaded/files.size);
      }
      else if(event.type ===HttpEventType.Response){
        this.message = 'Upload Success.';
        this.onUploadFinished.emit(event.body);
      }
    });
  }
}