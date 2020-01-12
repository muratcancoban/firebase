import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public user: firebase.User;

  constructor(private firestore: AngularFirestore, public firebaseAuth: AngularFireAuth) {
firebaseAuth.authState.subscribe(user => {this.user = user; });
  }


  yeniKayit(kayit, user) {
   //return this.firestore.collection('ogrenci').add(kayit);

    return this.firestore.doc<any>('kullanicilar/' + user).collection('ogrenci').add(kayit);
  }

  kayitlariOku(user) {
    //return this.firestore.collection('ogrenci').snapshotChanges();
    return this.firestore.doc<any>('kullanicilar/' + user).collection('ogrenci').snapshotChanges();
  }

  kayitGuncelle(kayit_id, kayit, user) {
    this.firestore.doc('kullanicilar/' + user + '/ogrenci/' + kayit_id).update(kayit);
  }

  kayitSil(kayit_id,user) {
    this.firestore.doc('kullanicilar/' + user + '/ogrenci/' + kayit_id).delete();
  }

  EpostaParolaGirisYap(bilgi) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(bilgi.eposta, bilgi.parola);
  }

  EpostaParolaKayitOl(bilgi) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(bilgi.eposta, bilgi.parola);
  }

}
