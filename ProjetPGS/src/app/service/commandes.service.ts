import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private apiUrl = 'http://localhost:5000/commande';
 
  constructor(private http: HttpClient) { }
 
  getPredictions(): Observable<{ dates: string[], predictions: number[] }> {
    return this.http.get<{ dates: string[], predictions: number[] }>(this.apiUrl);
  }
}