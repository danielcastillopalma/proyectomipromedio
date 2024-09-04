import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any = ""
  constructor(private router: Router, private auth: AuthenticationService) {
    let data = localStorage.getItem(this.auth.storageKey)
    if (data) {
      this.userData = JSON.parse(data);
      console.log(this.userData)
    }

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

  async logOut() {
    await this.auth.logOut();
  }

}
