import { Component, OnInit } from '@angular/core';
import { NotaService } from './nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent  {

  nota: string = '';

  constructor(private notaService: NotaService) {}

  guardarNota() {

    this.notaService.guardarNota//({ contenido: this.nota }); campo bugeado
    console.log('Nota guardada:', this.nota);
    this.nota = '';  // limpiar campo
  }

  editarNota() {
    
    console.log('Nota editada:', this.nota);
  }

  eliminarNota() {
    
    this.notaService.eliminarNota(0);  // eliminar nota
    console.log('Nota eliminada');
  }
}


