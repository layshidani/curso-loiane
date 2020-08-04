import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseResolveGuard } from './guards/course-resolve.guard';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  {
    path: 'novo', component: CoursesFormComponent, resolve: {
      course: CourseResolveGuard
    }
  },
  {
    path: 'editar/:id', component: CoursesFormComponent, resolve: {
      course: CourseResolveGuard
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
