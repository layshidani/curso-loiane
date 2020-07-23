import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { StateBR } from './../models/state.model';
import { CityBR } from './../models/city.model';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<StateBR[]>('assets/data/states.json');
  }

  getCities(stateID: string) {
    return this.http.get<CityBR[]>('assets/data/cities.json')
      .pipe(
        map((cities: CityBR[]) => cities.filter(city => city.estado == stateID))
      );
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

  getNewsletter() {
    return [
      { valor: 'yes', desc: 'Sim' },
      { valor: 'no', desc: 'Não' }
    ];
  }
}
