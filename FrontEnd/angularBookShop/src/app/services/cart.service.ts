import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const API_URL = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpOptions: { headers: HttpHeaders; } | undefined;
  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) { }
  addCart(user:string,book:string[],total: Number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization':''+this.tokenStorage.getToken()})
   
  };
    return this.http.post(API_URL + 'cart', {
      user,
      book,
      total
    }, this.httpOptions);
  }
  getcart(userId:string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization':''+this.tokenStorage.getToken()})
   
  };
    return this.http.post(API_URL + 'cart/id', {
      userId,
    }, this.httpOptions);
  }
}
