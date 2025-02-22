import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private baseUrl: string = environment.BASE_URL;
    constructor(private http: HttpClient) { }
    getAll(id:any): Observable<any> { 

        return this.http.get(`${this.baseUrl}user/messages/${id}`);
      }
      getByDesc(id:any,idSender:any,limit:any): Observable<any> { 
        
        return this.http.get(`${this.baseUrl}user/messages/${id}/${idSender}/${limit}`);
      }  
      send(data:any): Observable<any> { 
      
        return this.http.post(`${this.baseUrl}user/messages/ `,data);
        }

        update(user:any,send:any): Observable<any> { 
      
          return this.http.put(`${this.baseUrl}user/messages/${user}/${send}/ `,null);
          }

          getNbMessage(user:any): Observable<any> { 
      
            return this.http.get(`${this.baseUrl}user/messages/get/nb/message/${user}`);
            }
 
}
