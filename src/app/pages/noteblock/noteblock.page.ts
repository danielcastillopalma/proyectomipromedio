import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { coloresBasicos } from 'src/app/app.module';
import { NotesComponent } from 'src/app/components/notes/notes.component';

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
  message="prueba"
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NotesComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

}
