import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmissionService {
  private apiUrl = 'http://localhost:5000/predict';  // URL to your Flask API

  constructor(private http: HttpClient) { }

  getEmissionData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
