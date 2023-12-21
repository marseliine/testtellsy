import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { IResponse, LOCALSTORAGE } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  sub!: Subscription;

  authToken!: string;

  constructor(public http: HttpClient, private router: Router) {}

  data = this.http.get<IResponse[]>('/api/users/');

  public login() {
    return this.http.get<IResponse[]>('/api/users/');
  }

  public logout() {
    localStorage.removeItem(LOCALSTORAGE.KEY);
    this.authToken = '';
    setTimeout(() => {
      this.router.navigate(['/login']);
    });
  }

  getAuthToken() {
    this.authToken = localStorage.getItem(LOCALSTORAGE.KEY) || '';
    return this.authToken;
  }
}
