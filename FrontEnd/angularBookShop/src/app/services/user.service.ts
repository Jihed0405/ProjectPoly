import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  editUser(userId:string,email: string,firstname:string,lastname:string,tel:string,address:string,job:string,bio:string): Observable<any> {
    return this.http.post(API_URL + 'edituser', {
      userId,
      email,
      firstname,
      lastname,
      tel,
      address,
      job,
      bio 
    }, httpOptions);
  }
  getUser(userId:string): Observable<any> {
    return this.http.post(API_URL + 'getid', {
      userId
      
    }, httpOptions);
  }
}
