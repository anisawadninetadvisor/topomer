import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> { 

    return this.http.get(`${this.baseUrl}posts`);
  }
  getByUserLike(id:any,limit:any): Observable<any> { 

    return this.http.get(`${this.baseUrl}posts/user/${id}/${limit}`);
  }
  getById(id:any): Observable<any> { 

    return this.http.get(`${this.baseUrl}posts/${id}`);
  }
  getByUser(id:any): Observable<any> { 

    return this.http.get(`${this.baseUrl}posts/user/${id}`);
  }

  getByUserProfile(id:any): Observable<any> { 

    return this.http.get(`${this.baseUrl}posts/user/${id}/profile/get`);
  }
  
  getBackground()
  {
    return this.http.get(`${this.baseUrl}backgrounds`);
  }
  create(data:any): Observable<any> { 

    return this.http.post(`${this.baseUrl}posts`,data);
  }
  uploadImage(data:any,id:any): Observable<any> { 
    const headers = new HttpHeaders();
 
  
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`https://files.files-pub.com/api/uploadImages/${id}`,data,{
      headers: headers
      });
     }

     uploadVideo(data:any,id:any): Observable<any> { 
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      console.log(id)
      return this.http.post(`https://files.files-pub.com/api/uploadVideos/${id}`,data,{
        headers: headers
        });
       }
      sendComment(data:any): Observable<any> { 
      
        return this.http.post(`${this.baseUrl}comments/ `,data);
        }
      getComment(id:any): Observable<any> { 
    
          return this.http.get(`${this.baseUrl}comments/ ${id}`);
      }
      likes(data:any): Observable<any> { 
    
        return this.http.post(`${this.baseUrl}likes`,data);
    }
}
