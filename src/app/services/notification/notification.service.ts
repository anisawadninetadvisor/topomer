import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService { 

  private baseUrl: string = environment.BASE_URL;
    constructor(private http: HttpClient) { }
    getAll(id:any): Observable<any> { 

        return this.http.get(`${this.baseUrl}notification/${id}`);
    }
    getNb(id:any): Observable<any> { 

      return this.http.get(`${this.baseUrl}notification/${id}/nb`);
  }

  update(id:any): Observable<any> { 

    return this.http.put(`${this.baseUrl}notification/${id}`,null);
    }
}
