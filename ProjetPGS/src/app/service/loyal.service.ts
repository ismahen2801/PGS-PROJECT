import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoyalData {
  tenure: number[];
  loyalty: boolean[];
  message: string;
  customerCodes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LoyalService {
  private apiUrl = 'http://localhost:5000/loyal';

  constructor(private http: HttpClient) {}

  getLoyaltyData(): Observable<LoyalData> {
    return this.http.get<LoyalData>(this.apiUrl);
  }
}
