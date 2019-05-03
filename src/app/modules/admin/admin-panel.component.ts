import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_sharing/services';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private _authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public isRole() {
    return this._authService.checkRole()
  }
}
