import { Component, OnInit, Input } from '@angular/core';;
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { UploadImageService } from 'src/app/service/upload-image.service';

export interface User {
  name: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: []
})
export class AutocompleteComponent implements OnInit {
  
  myControl = new FormControl();
  options;
  filteredOptions: Observable<User[]>;

  constructor(private service: UploadImageService) { 
    this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(val => {
              return this.filter(val || '')
            })       
          );
    }

  ngOnInit() {
    
  }

  // filter and return the values
 filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter(option => { 
         return option.img.toLowerCase().indexOf(val.toLowerCase()) >= 0
       }))
     )
   }  


}
