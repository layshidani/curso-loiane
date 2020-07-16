import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable, empty } from 'rxjs';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { StateBR } from './../shared/models/state.model';

import { BaseFormComponent } from './../shared/base-form/base-form.component';

import { DropdownService } from './../shared/services/dropdown.service';
import { SearchCEPService } from './../shared/services/search-cep.service';
import { FormValidations } from '../shared/form-validarions';
import { VerifyEmailService } from './services/verify-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  // formulary: FormGroup;
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
    private emailVeriryService: VerifyEmailService,
  ) {
    super();
  }

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
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      email: [null, [Validators.required, Validators.email], [this.emailVerify.bind(this)]],
      emailConfirmation: [null, [FormValidations.equalsTo('email')]],
      address: this.formBuilder.group({
        zipcode: [null, [Validators.required, FormValidations.cepValidator]],
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

    this.formulary.get('address.zipcode').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log(value)),
        switchMap(status => status === 'VALID' ? this.cepService.searchCEP(this.formulary.get('address.zipcode').value) : empty())
      )
      .subscribe(data => data ? this.populateForm(data) : {});
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  submit() {
    console.log('form', this.formulary);

    let valueSubmit = Object.assign({}, this.formulary.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((value, i) => value ? this.frameworks[i] : null)
        .filter(item => item !== null)
    });

    console.log('valueSubmit', valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulary.value))
      .subscribe(dados => {
        console.log(dados);
        this.formulary.reset();
      },
        (error: any) => alert('erro'));
  }

  verifyInvalidEmail(fieldName) {
    const emailField = this.formulary.get(fieldName);

    if (emailField.errors) {
      return emailField.errors['email'] && emailField.touched;
    }
  }

  getField(field: string) {
    return this.formulary.get(field);
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
      email: null,
      emailConfirmation: null,
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

  emailVerify(formControl: FormControl) {
    return this.emailVeriryService.verifyEmail(formControl.value)
      .pipe(
        map(hasEmail => hasEmail ? { hasEmail: true } : null)
      )
  }
}
