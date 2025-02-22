import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/module-auth/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-montant',
  templateUrl: './choice-montant.page.html',
  styleUrls: ['./choice-montant.page.scss'],
})
export class ChoiceMontantPage implements OnInit {
  baseUrlFile: string = environment.BASE_URL_file;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private alertController: AlertController,
    private router: Router
  ) { }
  cardNumber: string = '';
  expDate: string = ''; // Format : MM/YY
  cvc: string = '';
  amount: number = 1000; // Montant en cents (par exemple
  id: any = 0;
  user: any = [];
  userId: any = 0;
  userSend: any = [];
  path: any = "";
  pay: any = 10.0;
  payEr: any = "";
  payStyle: any = "";
  type:any=1;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
    this.userSend = users;
    if (sessionStorage.getItem('path')) {
      if (sessionStorage.getItem('path') != "") {
        this.path = sessionStorage.getItem('path');
      } else {
        this.path = "/";
      }
    }
    this.getData();
  }

  getData() {
    this.profileService.getByIdUser(this.id)
      .subscribe(
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

  next() {
    if (this.pay < 10 || this.pay > 10000) {
      this.payEr = "Amount unavailable.";
      this.payStyle = "border-bottom:1px solid red !important";
    } else {
      this.payEr = "";
      this.payStyle = "";
      this.presentValidationAlert();
    }
  }

  async presentValidationAlert() {
   /* const alert = await this.alertController.create({
      header: 'Confirm Action',
      message: 'Are you sure you want to transact an amount of ' + this.pay + ' $ to ' + this.user.nom + ' ' + this.user.prenom + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Subscription canceled');
            return false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['/stripe/'+this.id+'/'+this.pay]);
            return true;
          }
        }
      ]
    });
 
    await alert.present();*/
    this.router.navigate(['/stripe/'+this.id+'/'+this.pay+"/"+this.type]);
  }

  async payement() {
    const data = {
      amount: this.pay * 100  // Assurez-vous que le montant est bien en cents
    };

  /*  this.profileService.payement(data).subscribe(
      async (responseData) => {
        if (responseData && responseData.clientSecret) {
          await this.confirmPayment(responseData.clientSecret);
          console.log(responseData);
        }
      },
      error => {
        console.error("Erreur lors du paiement :", error);
      }
    );*/
  }

  async confirmPayment(clientSecret: string) {
   /* try {
      const stripe = await loadStripe('pk_test_51QDjzwRtxsn7RuRfCavioiW7rNqhNjLKBSZtEKvFApD4BAPSw8XrsT9UMBhOFmhCLfZqflubNOmjS0bl2qpAm6Ss00A2VYkCEj');
      if (!stripe) {
        console.error("Erreur lors du chargement de Stripe");
        return;
      }

    
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        console.error("Erreur de paiement :", error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log("Paiement réussi !");
      
      }
    } catch (error) {
      console.error("Erreur lors de la confirmation du paiement :", error);
    }*/
  }

  async submitPayment() {
   
  }
  
}
