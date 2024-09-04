// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Promedio } from 'src/app/classes/promedio';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { getDocs as getFirestoreDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private collectionName = 'promedios';  // Nombre de la colección en Firestore
  uid: string = '';
  aritmetico: string[] = [];
  ponderado: string[] = [];

  constructor(
    private firestore: Firestore,  // Usa Firestore en lugar de AngularFirestore
    private auth: AuthenticationService
  ) {
    const data = localStorage.getItem(this.auth.storageKey);
    if (data) {
      const userData = JSON.parse(data);
      console.log(userData);
      this.uid = userData.id;
    }
  }

  // Guardar un nuevo documento en Firestore
  async guardarPromedio(promedio: Promedio): Promise<void> {
    const docRef = doc(collection(this.firestore, this.collectionName), this.uid, 'items', this.generateId());
    try {
      await setDoc(docRef, {
        title: promedio.title,
        content: promedio.content,
        type: promedio.type,
        email: promedio.email
      });
    } catch (error) {
      console.error('Error al guardar documento:', error);
      throw error;
    }
  }

  // Obtener documentos de Firestore
  obtenerPromedios(): Observable<Promedio[]> {
    const q = query(collection(this.firestore, this.collectionName, this.uid, 'items'));
    return new Observable(observer => {
      getDocs(q).then(querySnapshot => {
        const data: Promedio[] = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data() as Promedio);
        });
        observer.next(data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  // Procesar los promedios obtenidos y clasificarlos
  procesarPromedios() {
    this.obtenerPromedios().subscribe(data => {
      this.aritmetico = [];
      this.ponderado = [];

      data.forEach(promedio => {
        if (promedio.type === 'arit') {
          this.aritmetico.push(`${promedio.title} ${promedio.content}`);
        } else {
          this.ponderado.push(`${promedio.title} ${promedio.content}`);
        }
      });
    }, error => {
      console.error('Error al obtener promedios:', error);
    });
  }

  // Generar un ID único para cada documento
  private generateId(): string {
    return Math.random().toString(36).substring(2);
  }
}
