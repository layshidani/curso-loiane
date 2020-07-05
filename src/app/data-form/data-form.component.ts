import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SearchCEPService } from './../shared/services/search-cep.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulary: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private cepService: SearchCEPService,
  ) { }

  ngOnInit(): void {
    // com formGroup
    // this.formulary = new FormGroup({
    //   name: new FormControl('Seu nome'),
    //   email: new FormControl('email@email.com'),
    // });

    this.formulary = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        zipcode: [null, Validators.required],
        number: [null, Validators.required],
        street: [null, Validators.required],
        complement: [null],
        neightboor: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
      }),
    })
  }

  onSubmit() {
    console.log('form', this.formulary);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulary.value))
      .subscribe(dados => {
        console.log(dados);
        this.formulary.reset();
      },
      (error: any) => alert('erro'));
  }

  verifyValidTouched(fieldName) {
    // this.formulary.controls[fieldName] || this.formulary.get(fieldName)
    return !this.formulary.get(fieldName).valid && this.formulary.get(fieldName).touched;
  }

  verifyInvalidEmail(fieldName) {
    const emailField = this.formulary.get(fieldName);

    if (emailField.errors) {
      return emailField.errors['email'] && emailField.touched;
    }
  }

  applyCssError(fieldName) {
    return {
      'has-error': this.verifyValidTouched(fieldName),
      'has-feedback': this.verifyValidTouched(fieldName)
    }
  }
}
