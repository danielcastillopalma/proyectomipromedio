import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { coloresBasicos, coloresDuoc } from '../../app.module'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  userData: any = ""
  data: any;
  token = ""
  tipos: any = {
    tipo: ""
  }


  constructor(private router: Router, private loadingCtrl: LoadingController) {
    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    console.log(this.userData)
    console.log(this.userData.user.username)
  }

  ngOnInit() { }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  async logIn() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...', // Mensaje anim
      spinner: 'crescent',
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['/login']);


      this.data = "";
      console.log(this.data);
    }, 1000); // Tiempo del Spinner
  }

}
