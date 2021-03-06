import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';

import { CoursesService } from './../courses.service';
import { AlertModalService } from './../../shared/alert-modal.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.css']
})
export class CoursesFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CoursesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    /* não é necessário fazer unsubscribe neste caso,
    * pois ao mudar de rota,
    * o angular se encarrega da desinscrição
    */

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.service.loadByID(id))
    //   )
    //   .subscribe(
    //     (course) => this.updateForm(course)
    //   );

    /*
    * ['course'] -> nome da variavel do resolve
    * no courses-routing.module
    * A linha de código abaixo substitui o código acima
    */

    const course = this.route.snapshot.data['course'];

    this.form = this.fb.group({
      id: [course.id],
      nome: [course.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {

      let successMessage = 'Curso criado com sucesso! :)';
      let errorMsg = 'Erro ao criar o curso. Tente novamente :/';

      if (this.form.value.id) {
        successMessage = 'Curso atualizado! :)';
        errorMsg = 'Erro ao atualizar o curso. Tente novamente :/';
      }

      this.service.save(this.form.value)
        .subscribe(
          success => {
            this.modal.showAlertSuccess(successMessage);
            this.location.back();
          },
          error => this.modal.showAlertDanger(errorMsg),
          () => console.log('request completo')
        )
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }

}
