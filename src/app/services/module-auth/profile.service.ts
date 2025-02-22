import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = environment.BASE_URL;
  private baseUrlFile: string = environment.BASE_URL_file;
  constructor(private http: HttpClient) { }
  getTags(): Observable<any> { 

    return this.http.get(`${this.baseUrl}user/tags/`);
  }
  VerifEmailExiste(email:any): Observable<any> { 

    return this.http.post(`${this.baseUrl}users/email/`,email);
  }
  VerifUserNameExiste(username:any): Observable<any> { 
    return this.http.post(`${this.baseUrl}users/username/`,username);
  }
  login(login:any): Observable<any> { 
    return this.http.post(`${this.baseUrl}users/login/`,login);
  }
  loginGoogle(login:any): Observable<any> { 
    return this.http.post(`${this.baseUrl}users/login-google/`,login);
  }
  create(data: any): Observable<any> {
  
    
    return this.http.post<object>(`${this.baseUrl}users/`,data);
  }
  updateType(data: any,id:any): Observable<any> {
  
    
    return this.http.put<object>(`${this.baseUrl}users/type/${id}`,data);
  }
  updateTags(data: any,id:any): Observable<any> {
  
    
    return this.http.put<object>(`${this.baseUrl}users/tags/${id}`,data);
  }
  uploadImage(data:any,id:any): Observable<any> { 
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.baseUrlFile}api/uploadImages/${id}`,data,{
      headers: headers
      });
  }
  updateUser(data:any,id:any): Observable<any> { 
   
    return this.http.put(`${this.baseUrl}users/${id}`,data);
  }
  updatePassword(data:any,id:any): Observable<any> { 
   
    return this.http.put(`${this.baseUrl}users/reset-password/${id}`,data);
  }
  updateIsPrivate(data:any,id:any): Observable<any> { 
   
    return this.http.put(`${this.baseUrl}users/isprivate/${id}`,data);
  }
  abonne(data:any): Observable<any> { 
   
    return this.http.post(`${this.baseUrl}subscription`,data);
  }
  desabonne(id:any): Observable<any> { 
   
    return this.http.delete(`${this.baseUrl}subscription/${id}`);
  }
  getAbonne(id:any): Observable<any> { 
   
    return this.http.get(`${this.baseUrl}subscription/${id}`);
  }
  getFollowersUser(id:any): Observable<any> { 
   
    return this.http.get(`${this.baseUrl}subscription/shopperSubscription/${id}`);
  }
  getByIdUser(id:any): Observable<any> { 
   
    return this.http.get(`${this.baseUrl}users/${id}`);
  }
  getInteractions(id:any): Observable<any> { 
   
    return this.http.get(`${this.baseUrl}subscription/interactions/${id}`);
  }
  payement(data:any): Observable<any> { 
   
    return this.http.post(`${this.baseUrl}payments/sendAmount`,data);
  }
  sendData(data:any): Observable<any> { 
   
    return this.http.post(`${this.baseUrl}payments/sendData`,data);
  }

  block(data:any): Observable<any> { 
   
    return this.http.post(`${this.baseUrl}blokages`,data);
  }
  blockListe(id:any): Observable<any> { 
   
    return this.http.get(`${this.baseUrl}blokages/user/${id}`);
  }

  resetpassword(data:any): Observable<any> { 
   
    return this.http.post(`${this.baseUrl}users/changepassword`,data);
  }
  verifCode(data:any): Observable<any> { 
   
    return this.http.post(`${this.baseUrl}users/verifcode`,data);
  }
  newpassword(data:any): Observable<any> { 
   
    return this.http.post(`${this.baseUrl}users/newpassword`,data);
  }
  createPaymentSession(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}create-payment-intent`, data);
  }
}
