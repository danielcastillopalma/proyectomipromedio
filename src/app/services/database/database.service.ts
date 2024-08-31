import { Injectable } from '@angular/core';
import { child, get, getDatabase, push, ref } from "firebase/database";
import { AppComponent } from 'src/app/app.component';
import { Promedio } from 'src/app/classes/promedio';
import { AuthenticationService } from '../authentication/authentication.service';
import { onAuthStateChanged } from 'firebase/auth';
import { MispromediosPage } from 'src/app/pages/mispromedios/mispromedios.page';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  uid: any = ""

  aritmetico: any = []
  ponderado: any = []
  constructor(private app: AppComponent,
    private auth: AuthenticationService,
  ) {
    this.generateUid().then(() => {
      console.log("Uid generado");
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
    get(child(ref(db), `promedio/` + this.uid + '/')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            let tipo = data[key].type;
            let title = data[key].title;
            let cont = data[key].content;
            if (tipo === 'arit'){
              this.aritmetico.push(title+" "+cont);
            }else{
              this.ponderado.push(title+" "+cont);
            }

            this.aritmetico;
            this.ponderado;
          }
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}


