import { Component} from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  kayitlar: any;
  ogrenci_adi:string;
  ogrenci_bolum:string;
  ogrenci_ders:string;
  ogrenci_no:string;
  ogrenci_not:string;
  userID: string;

  constructor(private servis: FirestoreService, private router: Router, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        console.log(this.userID);
        this.listele();
      } else {
        this.router.navigateByUrl('/login');
      }
    });

}


listele() {
    this.servis.kayitlariOku(this.userID).subscribe(data => {this.kayitlar = data; console.log(data); },  error => {});

}

  yeniKayit() {
    let kayit = {};
    kayit['ogrenci_adi'] = this.ogrenci_adi;
    kayit['ogrenci_bolum'] = this.ogrenci_bolum;
    kayit['ogrenci_ders'] = this.ogrenci_ders;
    kayit['ogrenci_no'] = this.ogrenci_no;
    kayit['ogrenci_not'] = this.ogrenci_not;


    this.servis.yeniKayit(kayit, this.userID).then(sonuc => {
      this.ogrenci_adi = null;
      this.ogrenci_bolum = null;
      this.ogrenci_ders = null;
      this.ogrenci_no = null;
      this.ogrenci_not = null;
           
      console.log(sonuc);
    })
      .catch(error => {
        console.log(error);
      });
  }

  kayitDuzenle(kayit) {
    kayit.guncelleniyor = true;
    kayit.gadi = kayit.payload.doc.data().ogrenci_adi;
    kayit.gbolum = kayit.payload.doc.data().ogrenci_bolum;
    kayit.gders = kayit.payload.doc.data().ogrenci_ders;
    kayit.gno = kayit.payload.doc.data().ogrenci_no;
    kayit.gnot = kayit.payload.doc.data().ogrenci_not;
  }

  kayitGuncelle(secilenKayit) {
    let kayit = {};
    kayit['ogrenci_adi'] = secilenKayit.gadi;
    kayit['ogrenci_bolum'] = secilenKayit.gbolum;
    kayit['ogrenci_ders'] = secilenKayit.gders;
    kayit['ogrenci_no'] = secilenKayit.gno;
    kayit['ogrenci_not'] = secilenKayit.gnot;
    this.servis.kayitGuncelle(secilenKayit.payload.doc.id, kayit, this.userID);
    secilenKayit.guncelleniyor = false;
  }

  kayitSil(id) {
    this.servis.kayitSil(id, this.userID);
  }

  cikisYap() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

}
