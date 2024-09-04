// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Promedio } from 'src/app/classes/promedio';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  userData = null
  data:any=[]
  constructor(private firestore: Firestore, auth: AuthenticationService) {
    let data = localStorage.getItem(auth.storageKey)
    if (data) {
      this.userData = JSON.parse(data).id;
    }

  }


  guardarPromedio(prom: Promedio, id) {
    const promRef = collection(this.firestore, id);
    let data = JSON.parse(JSON.stringify(prom));
    return addDoc(promRef, data);
  }

  obtenerPromedios():Observable<Promedio[]> {
    const promRef = collection(this.firestore, this.userData!);
    this.data=collectionData(promRef);
    return collectionData(promRef) as Observable<Promedio[]>;
  }


}
