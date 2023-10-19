import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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
  notas: any = [
    {
      title: this.newTitle,
      content: this.newContent
    }
  ]

  constructor(
    private modalCtrl: ModalController,
    private bd: SqliteService,
    private router: Router
  ) { }
  guardar() {
    this.bd.addNota(this.newTitle, this.newContent);
    this.bd.presentToast("Nota Agregada");
    
  }

  ngOnInit() {
    this.bd.dbState().subscribe((res: any) => {
      if (res) {
        this.bd.fetchNotas().subscribe((item: any) => {
          this.notas = item;
        })
      }
    });

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
      console.log(data);
      this.guardar();
    }
  }

}