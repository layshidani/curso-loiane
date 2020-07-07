import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StateBR } from './../models/state.model';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<StateBR[]>('assets/data/states.json');
  }

  getRoles() {
    return [
      { nome: 'Dev1', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev2', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev3', nivel: 'Senior', desc: 'Dev Sr' }
    ];
  }

  getTechnologies() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'ruby', desc: 'Ruby' }
    ];
  }
}
