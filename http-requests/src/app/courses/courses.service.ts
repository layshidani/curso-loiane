import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { tap, take, delay } from 'rxjs/operators';

import { Course } from './models/curso.model';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

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

  loadByID(id) {
    return this.http.get<Course>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(course: Course) {
    return this.http.post(this.API, course).pipe(take(1));
  }

  private update(course: Course) {
    return this.http.put(`${this.API}/${course.id}`, course).pipe(take(1));
  }

  save(course: Course) {
    return course.id ? this.update(course) : this.create(course);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
