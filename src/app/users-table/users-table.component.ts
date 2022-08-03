import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component'


export interface Users {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const DATA_SOURCE: Users[] = [
];

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})

export class UsersTableComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['login', 'avatar_url', 'delete'];


  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}



  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    const obs$ = ajax.getJSON('https://api.github.com/users?per_page=10').pipe(
        map(userResponse => userResponse),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
    );
    
    obs$.subscribe((incomingData) => 
      this.dataSource = new MatTableDataSource(incomingData)
    );

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  addJason() {
    let testObj = {id: 102, login: "jasonsutter87", avatar_url: "https://avatars.githubusercontent.com/u/12101475?v=4"}
    this.dataSource.filteredData.push(testObj)
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData)
  }


  addUserModal() {
    console.log('clicking add user')
    let dialogRef = this.dialog.open(AddUserComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
   
  }

  addUser(data: any) {
    console.log('clicking this adduser fuction')

    this.dataSource.filteredData.push(data)
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData)
  }

  removeUser(user: any) {
    const userId = this.dataSource.filteredData.findIndex(object => {
      return object.id === user.id;
    });

    this.dataSource.filteredData.splice(userId, 1)
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData)
  }



  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

