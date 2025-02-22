import { Component, OnInit } from '@angular/core';
import { PaimentsService } from 'src/app/services/paiments/paiments.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  userId:any=0;
  base_url_file=environment.BASE_URL_file
  constructor(private paimentService:PaimentsService) { }
  data:any=[];
  data2:any=[];
  ngOnInit() {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    this.userId = users.id;
        this.getData();
  }
  getData()
  {
    this.paimentService.get(this.userId)
    .subscribe(
      data => {
        if (data.records) {
          this.data=data.records;
        }
      },
      error => {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    );
    this.paimentService.getuser(this.userId)
    .subscribe(
      data => {
        if (data.records) {
          this.data2=data.records;
        }
      },
      error => {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    );
  }

}
