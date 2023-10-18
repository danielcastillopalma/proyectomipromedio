import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


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
  ) { }

  ngOnInit() { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.addNote();
    return this.modalCtrl.dismiss(this.nota, 'confirm');
  }
  async addNote() {
    
    return this.nota
  }
}
