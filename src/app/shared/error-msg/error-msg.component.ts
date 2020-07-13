import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() showError: boolean;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage() {

    return null;
  }

}
