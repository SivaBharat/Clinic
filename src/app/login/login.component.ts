import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environments';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  Username!: FormControl;
  Password!: FormControl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authservice: AuthenticationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.Username = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      Username: this.Username,
      Password: this.Password
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login Success'
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid username or password'
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const Username = this.loginForm.get('Username')?.value;
      const Password = this.loginForm.get('Password')?.value;
      
      this.http.post(environment.login, { Username, Password }).subscribe(
        (response: any) => {
          if (response.success) {
            this.authservice.storeToken(response.token);
            this.showSuccess();
            setTimeout(() => {
              this.router.navigate(['']);
            }, 1000);
          } else {
            this.showError();
            this.loginForm.reset();
          }
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    }
  }
}
