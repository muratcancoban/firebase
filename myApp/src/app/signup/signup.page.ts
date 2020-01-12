import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  eposta:string;
  parola:string;
  girisHata:string;

  constructor(private firestoreservis: FirestoreService, private router: Router) { }

  ngOnInit() {
  }

  kayitOl() {

    if (!this.eposta) {
      return;
      }

      let bilgi = {
        eposta: this.eposta,
        parola: this.parola
      };
      this.firestoreservis.EpostaParolaKayitOl(bilgi).then(() => this.router.navigateByUrl('/home')).catch(error => {console.log(error); this.girisHata = error.message; } );
        }

  }
