import { Injectable } from '@angular/core';
import { child, get, getDatabase, push, ref } from "firebase/database";
import { AppComponent } from 'src/app/app.component';
import { Promedio } from 'src/app/classes/promedio';
import { AuthenticationService } from '../authentication/authentication.service';
import { onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  uid:any = ""
  aritmetico :any= []
  ponderado:any = []
  constructor(private app: AppComponent,
    private auth: AuthenticationService
  ) {
    this.generateUid().then(() => {
      console.log(this.uid);
    }).catch(error => {
      console.error('Error initializing UID:', error);
    });
  }

  async generateUid(): Promise<void> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth.objAuth, (user) => {
        if (user) {
          this.uid = user.uid;
          resolve();
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  async guardarPromedio(promedio: Promedio) {

    const db = getDatabase(this.app.objApp);
    push(ref(db, 'promedio/' + this.uid + '/'), {
      title: promedio.title,
      content: promedio.content,
      type: promedio.type,
      email: promedio.email
    });

  }

  async obtenerPromedios() {
    await this.generateUid();
    const db = getDatabase(this.app.objApp);
    console.log("uid: "+this.uid)
    get(child(ref(db), `promedio/`+this.uid+'/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        return snapshot;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}


