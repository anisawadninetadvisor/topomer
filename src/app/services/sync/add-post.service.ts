import { Injectable } from '@angular/core';
import {EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private postSource = new BehaviorSubject<any>(null); 
  post$ = this.postSource.asObservable();
  private messageSource = new BehaviorSubject<any>(null); 
  message$ = this.messageSource.asObservable();
  setPost(post: any) {
    this.postSource.next(post); 
  }
  setMessage(message$: any) {
    this.messageSource.next(message$); 
  }
}
