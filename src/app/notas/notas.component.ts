import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent  implements OnInit {

  nota: string = '';

  constructor() { }

  ngOnInit() {}


  guardarNota() {
    // Aquí puedes implementar la lógica para guardar la nota
    console.log('Nota guardada:', this.nota);
  }

  editarNota() {
    // Aquí puedes implementar la lógica para editar la nota
    console.log('Nota editada:', this.nota);
  }

  eliminarNota() {
    // Aquí puedes implementar la lógica para eliminar la nota
    this.nota = '';
    console.log('Nota eliminada');
  }
}


