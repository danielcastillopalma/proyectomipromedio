import { Component, ElementRef, VERSION, Inject, ViewChild, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { coloresBasicos, coloresDuoc } from '../../app.module'
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any = ""
  constructor(

    private db: DatabaseService,
    private storage: Storage,
    private element: ElementRef,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private storages: StorageService) {
    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    console.log(this.userData)
    console.log(this.userData.user.username)

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
  async logout() {
    localStorage.clear();
    await this.auth.logout();       
   
  }

}
