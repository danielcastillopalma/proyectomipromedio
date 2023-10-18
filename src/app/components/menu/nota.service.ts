import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private notas: any[] = [];

  constructor() { }

  guardarNota(nota: string) {
    this.notas.push(nota);
  }
  editarNota(id: number, contenido: string) {
    this.notas[id].contenido = contenido;
  }

  eliminarNota(id: number) {
    this.notas.splice(id, 1);
  }

  obtenerNotas() {
    return this.notas;
  }

}
