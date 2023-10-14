import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  nota: any = [{
    title: "",
    content: "",
  },]

  constructor(private modalCtrl: ModalController,
    private database: SqliteService) { }

  ngOnInit() { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.addNote();
    return this.modalCtrl.dismiss(this.nota, 'confirm');
  }
  async addNote(){
    await this.database.addNote(this.nota.title,this.nota.content);
    this.nota.title="";
    this.nota.content="";
  }
}
