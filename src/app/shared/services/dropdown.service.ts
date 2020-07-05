import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StateBR } from './../models/state.model';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<StateBR[]>('assets/data/states.json');
  }
}
