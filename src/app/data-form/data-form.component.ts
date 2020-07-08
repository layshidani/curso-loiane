import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { StateBR } from './../shared/models/state.model';

import { DropdownService } from './../shared/services/dropdown.service';
import { SearchCEPService } from './../shared/services/search-cep.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulary: FormGroup;
  states: Observable<StateBR[]>;
  roles: any[];
  technologies: any[];
  newsletter: any[];
  frameworks = ['Angular', 'React', 'Vue']

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private cepService: SearchCEPService,
    private dropdownService: DropdownService,
  ) { }

  ngOnInit(): void {
    this.states = this.dropdownService.getStates();
    this.roles = this.dropdownService.getRoles();
    this.technologies = this.dropdownService.getTechnologies();
    this.newsletter = this.dropdownService.getNewsletter();

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
      roles: [
        null
      ],
      technologies: [
        null
      ],
      newsletter: [
        null
      ],
      terms: [
        null,
        Validators.pattern('true')
      ],
      frameworks: this.buildFrameworks(),
    })
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values);
  }

  onSubmit() {
    console.log('form', this.formulary);

    let valueSubmit = Object.assign({}, this.formulary.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((value, i) => value ? this.frameworks[i] : null)
        .filter(item => item !== null)
    });

    console.log('valueSubmit', valueSubmit);

    if (this.formulary.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulary.value))
        .subscribe(dados => {
          console.log(dados);
          this.formulary.reset();
        },
        (error: any) => alert('erro'));
    } else {
      this.verifyFormsValidations(this.formulary);
    }
  }

  verifyFormsValidations(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.verifyFormsValidations(control);
      }
    })
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


  handleCEP() {
    let cep = this.formulary.get('address.zipcode').value;

    if (cep) {
      this.resetForm();

      this.cepService.searchCEP(cep)
        .subscribe(data => this.populateForm(data));
    }
  }

  populateForm(data) {
    this.formulary.patchValue({
      address: {
        street: data.logradouro,
        complement: data.complemento,
        neightboor: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    });
  }

  resetForm() {
    this.formulary.patchValue({
      address: {
        street: null,
        complement: null,
        neightboor: null,
        city: null,
        state: null
      },
      roles: [
        null
      ],
      technologies: [
        null
      ],
      newsletter: [
        null
      ],
      terms: [
        null
      ],
      frameworks: [null],
    });
  }

  setRole() {
    const role = { nome: 'Dev2', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulary.get('roles').setValue(role);
  }

  compareRole(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setTechnology() {
    this.formulary.get('technologies').setValue(['Ruby', 'JavaScript']);
  }

  comparetechnology(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome) : obj1 === obj2
  }
}
