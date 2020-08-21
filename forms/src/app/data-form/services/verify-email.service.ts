import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(
    private http: HttpClient
  ) { }

  verifyEmail(email: string){
    return this.http.get('assets/data/emailVerify.json')
      .pipe(
        delay(2000),
        map((data: { emails: any[]}) => data.emails),
        tap(console.log),
        map((data: {email: string}[]) => data.filter(v => v.email === email)),
        tap(console.log),
        map((data: any[]) => data.length > 0),
        tap(console.log)
      )
  }
}