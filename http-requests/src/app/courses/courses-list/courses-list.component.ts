import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Course } from './../models/curso.model';
import { CoursesService } from './../courses.service';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  // courses: Course[];
  courses$: Observable<Course[]>;

  constructor(
    private service: CoursesService,
  ) { }

  ngOnInit(): void {
    // this.service.list()
    //   .subscribe(data => this.courses = data);

    this.courses$ = this.service.list();
  }

}
