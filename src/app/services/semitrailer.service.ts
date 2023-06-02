import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class SemitrailerService {
  readonly semitrailerUrl = 'http://localhost:3000/semitrailers';
  constructor(private readonly apiService: ApiService) { }

  addSemitrailer(data: any): Observable<any> {
    return this.apiService.post(this.semitrailerUrl, data);
  }
  updateSemitrailer(id: number, data: any) {
    return this.apiService.update(`${this.semitrailerUrl}/${id}`, data)
  }
  getSemitrailersList(): Observable<any[]> {
    return this.apiService.get(this.semitrailerUrl);
  }
  deleteSemitrailer(id: number): Observable<any> {
    return this.apiService.delete(`${this.semitrailerUrl}/${id}`);
  }
}
