import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulary: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // com formGroup
    // this.formulary = new FormGroup({
    //   name: new FormControl('Seu nome'),
    //   email: new FormControl('email@email.com'),
    // });

    this.formulary = this.formBuilder.group({
      name: ['nome'],
      email: ['email@email.com']
    })
  }

}
