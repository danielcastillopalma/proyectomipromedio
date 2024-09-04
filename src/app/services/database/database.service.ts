import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Promedio } from 'src/app/classes/promedio';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private collectionName = 'promedios';  // Nombre de la colección en Firestore
  uid: string = '';
  aritmetico: string[] = [];
  ponderado: string[] = [];

  constructor(
    private firestore: AngularFirestore,
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
    const docRef = this.firestore.collection(this.collectionName).doc(this.uid).collection('items').doc();
    try {
      await docRef.set({
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
    return this.firestore.collection(this.collectionName).doc(this.uid).collection('items').valueChanges();
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
}
