import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class CrudService<T> {
  constructor(
    protected http: HttpClient,
    private API_URL,
  ) { }

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(1000),
        tap(console.log)
      );
  }

  loadByID(id) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(course) {
    return this.http.post(this.API_URL, course).pipe(take(1));
  }

  private update(course) {
    return this.http.put(`${this.API_URL}/${course.id}`, course).pipe(take(1));
  }

  save(course) {
    return course.id ? this.update(course) : this.create(course);
  }

  remove(id) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
