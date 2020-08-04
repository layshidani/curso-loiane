import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Course } from '../models/curso.model';
import { CoursesService } from './../courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolveGuard implements Resolve<Course> {

  constructor (
    private service: CoursesService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course | Observable<Course> | Promise<Course> {

    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id'])
    }

    return of({
      id: null,
      nome: null
    });
  }

}
