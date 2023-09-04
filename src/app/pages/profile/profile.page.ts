import { Component, ElementRef, VERSION, Inject, ViewChild, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { coloresBasicos, coloresDuoc } from '../../app.module'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private element: ElementRef, private router: Router, private activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
        console.log(this.data)
      } else {
        this.data = ["Mi Promedio"]
      }
    });
  }
  data: any;
  colores: any = {
    color: ""
  }
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  ngOnInit() {
  }
  logIn() {
    this.router.navigate(['/login']);
    this.data = "";
    console.log(this.data)
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  cambioColor() {
    if (this.colores.color = "DuocUC") {
      this.cuarto = coloresDuoc.cuarto;
      this.terciario = coloresDuoc.terciario;
      this.secundario = coloresDuoc.secundario;
      this.primario = coloresDuoc.primario;
    }
  }

}
