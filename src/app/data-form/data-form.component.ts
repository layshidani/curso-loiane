import { HttpClient } from '@angular/common/http';
import { SearchCEPService } from './../shared/services/search-cep.service';
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
      name: ['nome'],
      email: ['email@email.com']
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

}
