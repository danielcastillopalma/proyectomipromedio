import { Injectable, signal, WritableSignal } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite'

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
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection;
  private notes: WritableSignal<Note[]> = signal(<Note[]>([]))
  constructor() { }
  async iniciarPlugin() {
    this.db = await this.sqlite.createConnection(
      DB_NOTES,
      false,
      'no-encryption',
      1,
      false
    );
    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      );`;
    await this.db.execute(schema);
    this.loadNotes();
    return true;
  }

  //CRUD
  async loadNotes() {
    const notes = await this.db.query('SELECT * FROM notes');
    this.notes.set(notes.values || []);
  }
  async addNote(title:string,content:string){
    const query=`INSERT INTO notes(title,content) VALUES('${title},${content}')`;
    const result=await this.db.query(query);
    this.loadNotes();
    return result;
  }
  async updateNoteById(id:string,title:string,content:string){
    const query=`UPDATE notes SET (title='${title}',content='${content}' WHERE id=${id}`;
    const result=await this.db.query(query);
    this.loadNotes();
    return result;
  }
  async deleteNoteById(id:string){
    const query=`DELETE FROM notes WHERE id=${id}`;
    const result=await this.db.query(query);
    this.loadNotes();
    return result;
  }

  getNotes(){
    return this.notes;
  }


}
