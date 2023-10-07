import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  roleId: number | undefined;

  constructor(private authService: AuthenticationService,private router: Router) {}

  ngOnInit() {   
    this.authService.getRoleId().subscribe((roleId: number | undefined) => {
      this.roleId = roleId;
      console.log('roleId:', this.roleId); 
    });
  }
  logout() {    
    this.authService.clearRoleId();
    this.authService.clearUserId();
    this.authService.clearStaffDeptId();    
    this.router.navigate(['/login']);
  }
}
