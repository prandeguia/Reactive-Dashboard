import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
