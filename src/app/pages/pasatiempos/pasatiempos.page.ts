import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coloresBasicos } from 'src/app/app.module';

@Component({
  selector: 'app-pasatiempos',
  templateUrl: './pasatiempos.page.html',
  styleUrls: ['./pasatiempos.page.scss'],
})
export class PasatiemposPage implements OnInit {

  constructor(
    private router:Router
  ) { }
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  userData: any = ""

  ngOnInit() {
  }
  navigate(page:string){
    this.router.navigate(['/'+page]);
  }

}
