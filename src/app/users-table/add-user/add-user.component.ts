import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() user: any;
  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  newUser = new FormGroup({
    login: new FormControl(''),
    avatar_url: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  addUser(): void {
   this.dataEvent.emit(this.newUser.value)
  }

}
