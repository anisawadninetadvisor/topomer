import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/module-fil-actualite/posts.service';
@Component({
  selector: 'app-detaille-post',
  templateUrl: './detaille-post.page.html',
  styleUrls: ['./detaille-post.page.scss'],
})
export class DetaillePostPage implements OnInit {
  id: any = 0; // Utilisez `number` si l'ID est toujours numérique
  post: any = {}; // Objet initialisé comme vide
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getData();
    } else {
      this.loading = false; // Si aucun ID n'est trouvé
    }
  }

  getData() {
    this.postsService.getById(this.id).subscribe(
      data => {
        // Vérifiez si `data` est valide
        if (data && data.length) {
          this.post = data[0];
        } else {
          console.warn('Aucun post trouvé pour l\'ID :', this.id);
        }
        this.loading = false; // Fin du chargement
      },
      error => {
        console.error('Erreur lors de la récupération des données :', error);
        this.loading = false; 
      }
    );
  
  }
}
