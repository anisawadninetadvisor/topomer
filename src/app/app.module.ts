import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TestComponent } from './componets_test/test/test.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import des animations
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule, HttpClientModule, SocialLoginModule, BrowserAnimationsModule,NgxIntlTelInputModule,
     BsDropdownModule.forRoot()

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },/*Camera,
    SocialSharing, PhotoLibrary,*/
   /* AndroidPermissions,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('311031680675-hoc17tnp3hu7eva5mqaabph66rv37im4.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig
    }*/
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
