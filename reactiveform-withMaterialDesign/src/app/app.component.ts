import { Component } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validator';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { CurdoperationService } from './service/curdoperation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Reactive Form Using Material Design';
  private getURL = 'https://angular-07-http.firebaseio.com/posts.json';
  //private fetchDataURL = 'https://jsonplaceholder.typicode.com/posts';
  private fetchDataURL = 'http://localhost:8090/api/v1/employees';
  regiForm: FormGroup;
  private error = null;

// DI Syntax to build service
constructor(private fb: FormBuilder,private http:HttpClient,private curdService:CurdoperationService){
  this.regiForm = new FormGroup({
    fname: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
  });
}


//Get FormGroup using FormBuilder Service
ngOnInit() {
    // set the form field default values and validation rules
    this.regiForm = this.fb.group({
      fname: ['',[Validators.required,Validators.minLength(2)] ],
      lname: ['',[Validators.required,Validators.minLength(2)] ],
    });
}


// set getters for all input fields so we can use them to show the error messages on invalid state
get fname(){
  return this.regiForm.get('fname');
}

get lname(){
  return this.regiForm.get('lname');
}

// on submit
postRequest(){
  this.http.post(this.getURL,this.regiForm.value).subscribe((success)=>{
    console.log(success);
  });
  alert('Successfully Added '+ this.regiForm.value.fname +' and ' + this.regiForm.value.lname );
  }


 restData:any=[];
 /* private getRequest() {
     this.http.get(this.fetchDataURL).pipe((map(responseData => {
          const getArray: any = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              getArray.push({...responseData[key],id:key});
            }
          }
          return getArray;
        })))

        .subscribe(
          (resposeData)=>{
            //console.log(resposeData)
            this.resData = resposeData;
            console.log(this.resData);
        }
        )
      } */

  fetchData() {
    this.curdService.getRequest().subscribe(
      (success) => {
        console.log(success);
        this.restData = success;
      },(error)=>{
        console.log(error);
        this.error =error;
      }
    );
  }

}
