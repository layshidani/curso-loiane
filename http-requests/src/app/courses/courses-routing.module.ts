import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'novo', component: CoursesFormComponent },
  { path: 'editar:id', component: CoursesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
