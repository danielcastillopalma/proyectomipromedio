import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nota } from '../classes/nota';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  userData: any="";
  email:any="";
  public database!: SQLiteObject;
  tblNotas: string = "CREATE TABLE IF NOT EXISTS nota(id INTEGER PRIMARY KEY autoincrement, title VARCHAR(50) NOT NULL, content TEXT NOT NULL, email TEXT NOT NULL);";
  listaNotas = new BehaviorSubject<Nota[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    
   this.crearBD(); 
   this.userData = JSON.parse(localStorage.getItem('usuario')!);

  }
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'mipromedio2.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD creada");
        //llamo a crear la(s) tabla(s)
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })

  }
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblNotas, []);
      this.presentToast("Tabla creada");
      this.cargarNotas(); 
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en Crear Tabla: " + error);

    }
  }
  
  cargarNotas() {
    let items: Nota[] = [];
    this.database.executeSql('SELECT * FROM nota WHERE email = ?', [this.userData.user.email])
      .then(res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
           
            items.push({
              id: res.rows.item(i).id,
              title: res.rows.item(i).title,
              content: res.rows.item(i).content,
              email:res.rows.item(i).email,
            });
          }
        }
      });
    this.listaNotas.next(items);
  }
  async addNota(title: any, content: any, email:any) {
    let data = [title, content,email];
    await this.database.executeSql('INSERT INTO nota(title,content,email)VALUES(?,?,?)', data);
    this.cargarNotas();
  }
  /*** Método que actualiza el título y/o el texto filtrando por el id*/
  async updateNota(id: any, title: any, content: any) {
    let data = [title, content, id];
    await this.database.executeSql('UPDATE nota SET title=?, content=?WHERE id=?', data);
    this.cargarNotas();
  }
  /*** Método que elimina un registro por id de la tabla noticia*/
  async deleteNota(id: any) {
    await this.database.executeSql('DELETE FROM nota WHERE id=?', [id]);
    this.cargarNotas();
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
  /*** Método que se ejecuta cada vez que se hace un cambio en la tabla dela BD*/
  fetchNotas(): Observable<Nota[]> {
    return this.listaNotas.asObservable();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: 3000
    }); toast.present();
  }

}
