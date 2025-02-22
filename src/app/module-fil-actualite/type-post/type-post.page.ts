import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-post',
  templateUrl: './type-post.page.html',
  styleUrls: ['./type-post.page.scss'],
})
export class TypePostPage implements OnInit {
  type:any=2;
  
  constructor(private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('type_post'))
    {
     console.log(sessionStorage.getItem('type_post'))
      if(sessionStorage.getItem('type_post')=='1') this.type=1;
      if(sessionStorage.getItem('type_post')=='2') this.type=2;
      if(sessionStorage.getItem('type_post')=='3') this.type=3;
    }
  }
  choice(type:any)
  {
    this.type=type;
    
  }
  next()
  {
    if(this.type==1) sessionStorage.setItem('type_post','1');
    if(this.type==2)  sessionStorage.setItem('type_post','2');
    if(this.type==3)  sessionStorage.setItem('type_post','3');
    if(this.type==1) this.router.navigate(['/create-post']);
    if(this.type==2) this.router.navigate(['/create-post-image']);
    if(this.type==3) this.router.navigate(['/create-post-video']);
  }

}
