import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coloresBasicos } from '../../app.module'

@Component({
  selector: 'app-block-de-notas',
  templateUrl: './block-de-notas.page.html',
  styleUrls: ['./block-de-notas.page.scss'],
})
export class BlockDeNotasPage implements OnInit {

  constructor(private router: Router,) { }
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;

  ngOnInit() {
  }
  retroceso() {
    this.router.navigate(['/home']);
  }
}
