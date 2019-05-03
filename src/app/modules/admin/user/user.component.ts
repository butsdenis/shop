import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material'
import { User } from 'src/app/_sharing/models'
import { UserService } from 'src/app/_sharing/services' 


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  public dataSource = new MatTableDataSource<User>()
  public displayedColumns: string[] = ['_id', 'name', 'role', 'actions']
  selectedValue: string
  user
  role = [
    {value: 'editor', viewValue: 'Editor'},
    {value: 'admin', viewValue: 'Admin'},
    {value: 'super', viewValue: 'Super'}
  ];

  constructor(
    private _userService: UserService
    
  ) { }

  ngOnInit() {
      this.getUsers()
  }

  public getUsers() {
      this._userService.getUsers()
      .subscribe(res => {
        this.dataSource.data = res;
      },
      error => console.log(error)) 
  }

  public deleteUser(id: string) {
    if (confirm(`Are you sure you want to delete the user. This cannot be undone.`)) {
      this._userService.deleteUser(id).subscribe(
        res => {
          this.getUsers();
        }
      )
    }
  }

  public selectRole(event, id:string) {
    this._userService.editUserRole(event.value, id)
    .subscribe(_ => _)
  }

}
