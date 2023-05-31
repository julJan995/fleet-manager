import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) { }

  post(url: string, data: any): Observable<any> {
    return this._http.post(url, data);
  }

  update(url: string, data: any): Observable<any> {
    return this._http.put(url, data);
  }

  get(url: string): Observable<any> {
    return this._http.get(url);
  }

  delete(url: string): Observable<any> {
    return this._http.delete(url);
  }
}
