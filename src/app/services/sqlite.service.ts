import { Injectable, signal, WritableSignal } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'
import { Platform, ToastController } from '@ionic/angular';

const DB_NOTES = 'mipromediodb';

export interface Note {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public database: SQLiteObject;
  schema: string = `CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    );`;
  notes = new BehaviorSubject<Note[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController) {
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'notas.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD creada");
        //llamo a crear la(s) tabla(s)
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchNotes(): Observable<Note[]> {
    return this.notes.asObservable();
  }
  async crearTablas() {
    try {
      await this.database.executeSql(this.schema, []);
      this.presentToast("Tabla creada");
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en Crear Tabla: " + error);
    }
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }



  //CRUD
  loadNotes() {
    let items: Note[] = []
    this.database.executeSql('SELECT * FROM notes')
      .then(res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              title: res.rows.item(i).title,
              content: res.rows.item(i).content
            });
          }
        }
      });
    this.notes.next(items);

  }
  async addNote(title: string, content: string) {
    const query = `INSERT INTO notes(title,content) VALUES('${title},${content}')`;
    const result = await this.database.executeSql(query);
    this.loadNotes();
    return result;
  }
  async updateNoteById(id: string, title: string, content: string) {
    const query = `UPDATE notes SET (title='${title}',content='${content}' WHERE id=${id}`;
    const result = await this.database.executeSql(query);
    this.loadNotes();
    return result;
  }
  async deleteNoteById(id: string) {
    const query = `DELETE FROM notes WHERE id=${id}`;
    const result = await this.database.executeSql(query);
    this.loadNotes();
    return result;
  }

  getNotes() {
    return this.notes;
  }


}
