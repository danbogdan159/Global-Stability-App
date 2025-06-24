import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiURL = 'http://localhost:8080/country';

  constructor(private http: HttpClient) {}

  getCountryDetails(countryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${countryId}}`);
  }
  getCountryStability(countryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${countryId}`);
  }

}
