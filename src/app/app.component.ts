import { Component,OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
          splashScreen.style.display = 'none';
        }
      }, 4000);
    });
  }
}
