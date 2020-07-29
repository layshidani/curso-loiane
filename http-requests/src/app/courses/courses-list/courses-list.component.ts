import { Component, OnInit } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from './../models/curso.model';
import { CoursesService } from './../courses.service';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  courses$: Observable<Course[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CoursesService,
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh () {
    this.courses$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty();
        })
      );
  }

}
