import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadImageService } from 'src/app/service/upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styles: [],
  providers: [UploadImageService]
})
export class UploadImageComponent implements OnInit {
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  isSubmitted: boolean = false;
  thumbnail: any;
  constructor(private imageService: UploadImageService,
    private sanitizer: DomSanitizer) { }



  ngOnInit(): void {
    this.imageService.getImageList().subscribe(baseImage  => {
      this.thumbnail = baseImage['img'].toString().replace("\\","/");
      console.log(this.thumbnail);
    })

  }

  handleFIleInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit(Caption, Image) {
    this.imageService.postFile(Caption.value, this.fileToUpload).subscribe(
      data => {

        console.log('done');
        Caption.value = null;
        Image.value = null;
        this.imageUrl = "/assets/img/default-image.png";
      }
    );
  }

}
