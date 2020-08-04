import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, take, delay } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { CrudService } from './../shared/crud-service';
import { Course } from './models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends CrudService<Course> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, `${environment.API}cursos`);
  }
}
