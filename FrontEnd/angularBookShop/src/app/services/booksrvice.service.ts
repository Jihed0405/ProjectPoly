import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class BooksrviceService {
  httpOptions: { headers: HttpHeaders; } | undefined;

  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) { }
  getbooks(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization':''+this.tokenStorage.getToken()})
   
  };
    return this.http.get(API_URL + 'book'
    , this.httpOptions);
  }
  getbookById(bookId:string,): Observable<any> {
    return this.http.post(API_URL + 'book/id', {bookId}
    ,this.httpOptions);
  }
  getCategories(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization':''+this.tokenStorage.getToken()})
   
  };
    return this.http.get(API_URL + 'book/cat'
    , this.httpOptions);
  }
}
