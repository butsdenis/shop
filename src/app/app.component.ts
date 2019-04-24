import { Component } from '@angular/core';
import { AuthenticationService } from './_sharing/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _authService: AuthenticationService
  ) {}

  public isLogged = () => {
    return this._authService.isLogin()
  }

  public logOut = () => {
    this._authService.logout()
  }

  public getRole = () => {
    return this._authService.getRole()
  }
}