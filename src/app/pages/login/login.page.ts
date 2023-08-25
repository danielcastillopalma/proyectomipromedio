import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { coloresBasicos } from '../../app.module'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss',],
})
export class LoginPage implements OnInit {
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  user={
    email:"",
    password:""
  }
  presentingElement = undefined;
  




  constructor(private router: Router,private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.presentingElement! = document.querySelector('.ion-page')!;
  }
  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Quieres salir sin guardar?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
  logIn(){
    console.log(this.user);
    let navigationextras: NavigationExtras={
      state:{
        user:this.user
      }
    }
    this.router.navigate(['/home'],navigationextras)
  }
}
