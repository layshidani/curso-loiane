import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  user: any = {
    name: null,
    email: null,
    country: 'Brasil'
  };

  onSubmit(form) {
    console.log('Form', form, this.user);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
