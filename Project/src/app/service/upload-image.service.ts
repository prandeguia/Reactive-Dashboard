import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  postFile(caption: string, fileUpload:File){
    const endpoint = 'http://localhost:51460/api/Image';
    const formData: FormData = new FormData();
    formData.append('Image',fileUpload,fileUpload.name);
    formData.append('ImageCaption',caption);
    return this.http.post(endpoint,formData);
  }

  getImageList(){
   return this.http.get('http://localhost:51460/api/Image');
  }

  opts = [];

getData() {
  return this.opts.length ?
    of(this.opts) :
    this.http.get<any>('http://localhost:51460/api/Image').pipe(tap(data => this.opts = data))
}
}
