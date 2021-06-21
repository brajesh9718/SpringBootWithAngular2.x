import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurdoperationService {

  private getURL = 'https://angular-07-http.firebaseio.com/posts.json';
  //private fetchDataURL = 'https://jsonplaceholder.typicode.com/posts';
  private fetchDataURL = 'http://localhost:8090/api/v1/employees';
  response:any;

  constructor(private http:HttpClient) { }

  getRequest(){
    return this.http.get(this.fetchDataURL,{
        headers: new HttpHeaders({ "Custom-Headers": "Hello World!!" }),
        params: new HttpParams().set("print", "pretty"),
        })
  }
}
