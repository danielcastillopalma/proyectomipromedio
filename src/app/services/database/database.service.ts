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
  constructor(private app: AppComponent,
    private auth: AuthenticationService
  ) {
   
    this.generateUid();
    console.log(this.uid);
  }

  async generateUid() {
    onAuthStateChanged(this.auth.objAuth, (user) => { 
      this.uid = user?.uid;
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

  async obtenerPromedios(mail) {
    await this.generateUid();
    const db = getDatabase(this.app.objApp);
    get(child(ref(db), `promedio/${this.uid}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}


