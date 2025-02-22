import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaimentsService {

  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  get(id:any): Observable<any> { 

    return this.http.get(`${this.baseUrl}payments/client/${id}`);
    }
    getuser(id:any): Observable<any> { 

      return this.http.get(`${this.baseUrl}payments/user/${id}`);
      }
create(data:any): Observable<any> { 

  return this.http.post(`${this.baseUrl}payments/`,data);
  }
}
