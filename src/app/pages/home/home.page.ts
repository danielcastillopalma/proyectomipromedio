import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  tipoPromedio={
    tipo:""
  }

  constructor(private router: Router) {    
  }
  ngOnInit() {
  }
 tipoPromedioSelect(){
  console.log(this.tipoPromedio.tipo)
 }

}

