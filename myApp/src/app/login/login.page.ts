import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  eposta:string;
  parola:string;
  girisHata:string;

  constructor(private firestoreservis: FirestoreService, private router: Router) { }

  ngOnInit() {
  }

  login() {

if (!this.eposta) {
return;
}

let bilgi = {
  eposta: this.eposta,
  parola: this.parola
};
this.firestoreservis.EpostaParolaGirisYap(bilgi).then(() => this.router.navigateByUrl('/home')).catch(error => {console.log(error); this.girisHata = error.message; } );
  }

  kayitOl() {
    this.router.navigateByUrl('/signup');
  }

}
