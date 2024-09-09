import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  private baseUrl = 'http://localhost:5000'; // Adjust if necessary

  constructor(private http: HttpClient) { }

  getClusterData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/run_kmeans`);
  }
}
