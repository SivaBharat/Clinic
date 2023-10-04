import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { environment } from 'src/environment/environments';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  Username!:FormControl;
  Password!:FormControl;
  constructor(private router: Router, private http: HttpClient,private authservice: AuthenticationService) { }

  ngOnInit() {
    this.Username=new FormControl('',[Validators.required])
    this.Password=new FormControl('', [Validators.required])

    this.loginForm= new FormGroup({
     Username:this.Username,
    Password:this.Password 
    });
  }
  
  onSubmit() {
    const Username = this.loginForm.get('Username')?.value;
    const Password = this.loginForm.get('Password')?.value;

    // Make an API call to check if the credentials are valid
    this.http.post(environment.login, { Username, Password }).subscribe(
      (response: any) => {
        if (response.success) {
          // Credentials are valid, show success message
          this.authservice.setRoleId(response.roleId); 
          this.authservice.setUserId(response.userId); 
          this.authservice.setStaffDeptId(response.departmentId);        
          alert('Login successful');
          this.router.navigateByUrl('');
        } else {
          // Invalid credentials, show error message
          alert('Invalid username or password');
          this.loginForm.reset();
        }
      },
      (error) => {
        // Handle API error here
        console.error('API error:', error);
      }
    );
  }
}
