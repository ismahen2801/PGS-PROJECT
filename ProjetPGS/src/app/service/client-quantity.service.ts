// src/app/client-quantity.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientQuantityService {
  private apiUrl = 'http://localhost:5000/clientQ';  // URL to your Flask API

  constructor(private http: HttpClient) { }

  getClusterData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
