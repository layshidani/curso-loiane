import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { tap, take, delay } from 'rxjs/operators';

import { Course } from './models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = `${environment.API}cursos`;

  constructor(
    private http: HttpClient,
  ) { }

  list() {
    return this.http.get<Course[]>(this.API)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  create(course: Course) {
    return this.http.post(this.API, course).pipe(take(1));
  }
}
