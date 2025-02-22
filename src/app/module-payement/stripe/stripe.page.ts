import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { loadStripe } from '@stripe/stripe-js';
import { ToastController } from '@ionic/angular';
import { PaimentsService } from 'src/app/services/paiments/paiments.service';
@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
  baseUrlFile: string = environment.BASE_URL_file;
  cardName: string = ''; // Nom sur la carte
  cardNumber: string = ''; // Numéro de la carte
  cardCvc: string = ''; // CVC de la carte
  cardExpiry: string = ''; // Date d'expiration (MM/YY)
  amount: number = 0; // Montant de paiement

  id: any = 0;
  user: any = [];
  userId: any = 0;
  userSend: any = [];
  path: any = "";
  pay: any = 10.0;
  payEr: any = "";
  stripe: any;
  elements: any;
  card: any;
  type:any;
confirmPaiment:any=false;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private alertController: AlertController,private toastController: ToastController,private paimentService:PaimentsService
  
  ) {
   
  }

  async ngOnInit() {


    if(this.confirmPaiment==false)
    {
      this.stripe = await loadStripe('pk_test_51QDjzwRtxsn7RuRfCavioiW7rNqhNjLKBSZtEKvFApD4BAPSw8XrsT9UMBhOFmhCLfZqflubNOmjS0bl2qpAm6Ss00A2VYkCEj');  // Clé publique Stripe
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }





    this.id = this.route.snapshot.paramMap.get('id');
    this.pay = this.route.snapshot.paramMap.get('pay');
    this.type = this.route.snapshot.paramMap.get('type');

   this.amount=this.pay*100;
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
    this.userSend = users;
    if (sessionStorage.getItem('path')) {
      if (sessionStorage.getItem('path') !== "") {
        this.path = sessionStorage.getItem('path');
      } else {
        this.path = "/";
      }
    }
    this.getData();
  }

  getData() {
    this.profileService.getByIdUser(this.id).subscribe(
      data => {
        if (data) {
          this.user = data;
        }
      },
      error => {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    );
  }

  async processPayment() {
    const {token, error} = await this.stripe.createToken(this.card);
    if (error) {
      console.error(error.message);
    } else {
      this.sendTokenToServer(token.id);
    }
  }
  async sendTokenToServer(token: string) {
    let data = {
      token: token,
      amount: this.amount
    };
    this.profileService.createPaymentSession(data).subscribe(
      async data => {
        if (data.clientSecret) {
          try {
            const { error, paymentIntent } = await this.stripe.confirmCardPayment(data.clientSecret);
            if (error) {
              this.showErrorToast('Error during payment')
    
            } else {
             this.confirmPaiment=true;
             let data={
              "user":this.id,
              "client":this.userId,
              "amounts":this.pay,
              "status":1,
              "notes":"vide",
              "type":this.type
             }
             this.paimentService.create(data).subscribe(
              data => {
                    console.log(data)
              },
              error => {
                console.error("Erreur lors de la récupération des données utilisateur:", error);
              }
            );

            }
          } catch (err) {
            this.showErrorToast('Error during payment')
         
          }
        }
      },
      error => {
        this.showErrorToast('Error during payment');
      
      }
    );
  }
  async showErrorToast(msg:any) {
    const toast = await this.toastController.create({
      message:msg,  
      duration: 3000,  
      position: 'top',  
      color: 'danger', 
      cssClass: 'custom-toast-class' 
    });

    toast.present(); 
  }
}
