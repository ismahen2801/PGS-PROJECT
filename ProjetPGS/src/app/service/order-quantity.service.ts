import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderQuantityService {

  private apiUrl = 'http://127.0.0.1:5000/forecast';

  constructor(private http: HttpClient) { }

  getForecastData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
