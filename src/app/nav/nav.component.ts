import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  roleId: number | undefined;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    // Initialize roleId from the authentication service
    this.roleId = this.authService.getRoleId();
  }
}
