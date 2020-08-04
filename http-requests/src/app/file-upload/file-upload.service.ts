import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient,
  ) { }

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    // const request = new HttpRequest('POST', url, formData);

    return this.http.post(url, formData);
  }
}
