import { Injectable } from '@angular/core';
import { getDatabase, push, ref, set } from "firebase/database";
import { AppComponent } from 'src/app/app.component';
import { Promedio } from 'src/app/classes/promedio';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private app: AppComponent) {

  }

  guardarPromedio(promedio: Promedio) {
    const db = getDatabase(this.app.objApp);
    push(ref(db, 'promedio/'), {
      title: promedio.title,
      content: promedio.content,
      type: promedio.type,
      email: promedio.email
    });

  }

}


