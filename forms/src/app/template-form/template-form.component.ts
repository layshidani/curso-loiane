import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { SearchCEPService } from '../shared/services/search-cep.service';
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
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe(dados => {
        console.log(dados);
        form.form.reset();
      });
  }

  constructor(
    private http: HttpClient,
    private cepService: SearchCEPService,
  ) { }

  ngOnInit(): void {
  }

  verifyValidTouched(field) {
    return !field.valid && field.touched;
  }

  applyCssError(field) {
    return {
      'has-error': this.verifyValidTouched(field),
      'has-feedback': this.verifyValidTouched(field)
    }
  }

  handleCEP(cep, form) {
    cep = cep.replace(/\D/g, '');

    if (cep) {
      this.resetForm(form);

      this.cepService.searchCEP(cep)
        .subscribe(data => this.populateForm(data, form));
    }
  }

  populateForm(data, formulary) {
    // formulary.setValue({
    //   name: formulary.value.name,
    //   email: formulary.value.email,
    //   address: {
    //     street: data.logradouro,
    //     cep: data.cep,
    //     number: '',
    //     complement: data.complemento,
    //     neightboor: data.bairro,
    //     city: data.localidade,
    //     state: data.uf
    //   }
    // });

    formulary.form.patchValue({
      address: {
        street: data.logradouro,
        // cep: data.cep,
        complement: data.complemento,
        neightboor: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    });

    console.log(data, formulary);
  }

  resetForm(formulary) {
    formulary.form.patchValue({
      address: {
        street: null,
        complement: null,
        neightboor: null,
        city: null,
        state: null
      }
    });
  }

}
