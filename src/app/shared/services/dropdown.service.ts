
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get('assets/data/states.json')
      .map((res: Response) => res.json());
  }
}
