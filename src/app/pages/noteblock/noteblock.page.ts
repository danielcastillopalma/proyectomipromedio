import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { coloresBasicos } from 'src/app/app.module';
import { NotesComponent } from 'src/app/components/notes/notes.component';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-noteblock',
  templateUrl: './noteblock.page.html',
  styleUrls: ['./noteblock.page.scss'],
})
export class NoteblockPage implements OnInit {
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  userData: any = ""
  newTitle = ""
  newContent = ""
  notas = this.database.getNotes();
  constructor(private modalCtrl: ModalController,
    private database: SqliteService) {

  }

  ngOnInit() {
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NotesComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.newTitle = data.title;
      this.newContent = data.content;
    }
  }

}
