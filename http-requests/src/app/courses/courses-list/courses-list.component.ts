import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../../shared/alert-modal.service';

import { Course } from './../models/curso.model';
import { CoursesService } from './../courses.service';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  deleteModalRef: BsModalRef;

  @ViewChild('deleteModal') deleteModal;

  courses$: Observable<Course[]>;
  error$ = new Subject<boolean>();
  selectedCourse: Course;

  constructor(
    private service: CoursesService,
    private alertService: AlertModalService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
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
          this.handleError();
          return empty();
        })
      );
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(course: Course) {
    this.selectedCourse = course;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(course.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.selectedCourse.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

}
