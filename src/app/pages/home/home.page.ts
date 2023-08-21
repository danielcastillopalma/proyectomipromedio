import { Component, ElementRef, VERSION, Inject, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})

export class HomePage {
  tipoPromedio = {
    tipo: ""
  }

  constructor(private renderer: Renderer2, private element: ElementRef, private router: Router) {
    
  }
  @ViewChild('promedioBasico') promedioBasico:ElementRef;
  @ViewChild('promedioPorcentual') promedioPorcentual:ElementRef;
  @ViewChild('promedioDecimal') promedioDecimal:ElementRef;
  ngOnInit() {
  }
 
  tipoPromedioSelect() {
    
   const promBas= this.promedioBasico.nativeElement;
   const promPorc= this.promedioPorcentual.nativeElement;
   const promDec= this.promedioDecimal.nativeElement;
   if (this.tipoPromedio.tipo!=""){
    if (this.tipoPromedio.tipo=="basico"){
      promBas.removeAttribute("hidden");
      promPorc.setAttribute("hidden","");
      promDec.setAttribute("hidden","");
      
    }else if(this.tipoPromedio.tipo=="porcentual"){
      promPorc.removeAttribute("hidden");
      promBas.setAttribute("hidden","");
      promDec.setAttribute("hidden","");
    }else if(this.tipoPromedio.tipo=="decimal"){
      promDec.removeAttribute("hidden");
      promBas.setAttribute("hidden","");
      promPorc.setAttribute("hidden","");
    }
   }
   
  }
}



