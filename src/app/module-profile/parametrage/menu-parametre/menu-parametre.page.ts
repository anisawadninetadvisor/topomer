import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-parametre',
  templateUrl: './menu-parametre.page.html',
  styleUrls: ['./menu-parametre.page.scss'],
})
export class MenuParametrePage implements OnInit {
  user:any=[];
  constructor() { }
  baseUrlFile: string = environment.BASE_URL_file;
  ngOnInit() {
    let user =sessionStorage.getItem('user');
    this.user= user ? JSON.parse(user) : null;
  }

}
