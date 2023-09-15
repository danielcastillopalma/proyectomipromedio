import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent  implements OnInit {

  contenidoNota: string = '';

  constructor(private ModalController: ModalController,  private storage: Storage) { }

  ngOnInit() {}

 
}

