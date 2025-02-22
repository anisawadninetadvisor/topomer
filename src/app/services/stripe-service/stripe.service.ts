// stripe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { Stripe } from '@capacitor-community/stripe';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private http: HttpClient) {}

 /* async createPaymentIntent(amount: number) {
    try {
      const { clientSecret } = await this.http
        .post<any>(`${environment.BASE_URL}create-payment-intent`, { amount })
        .toPromise();

      await Stripe.initialize({
        publishableKey: 'pk_test_your_publishable_key',
      });

      const result = await Stripe.confirmPayment({
        paymentIntentClientSecret: clientSecret,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    } catch (error) {
      console.error('Erreur Stripe:', error);
      throw error;
    }
  }*/
}
