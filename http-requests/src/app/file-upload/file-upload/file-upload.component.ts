import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { FileUploadService } from './../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  files: Set<File>;
  uploadProgress = 0;

  constructor(
    private service: FileUploadService,
  ) { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');

    this.uploadProgress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, `${environment.BASE_URL}/upload`)
        .subscribe(event => {
          // HttpEventType
          console.log(event)

          if (event.type === HttpEventType.Response) {
            console.log('Upload concluído')
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);

            console.log('> Progresso', percentDone);

            this.uploadProgress = percentDone;
          }
        })
    }
  }
}
