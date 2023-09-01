import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, LoadingController} from '@ionic/angular';
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
  
  loading = false;



  constructor(private router: Router,private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) { }

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
  async logIn(){
    console.log(this.user);
     
  const loading = await this.loadingCtrl.create({
    message: 'Iniciando sesión...',
    spinner: 'crescent', // cambiar el tipo de spinner
  });
  await loading.present();

  try {
    
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        

        
        resolve();
      }, 2000); // Simulación de tiempo de inicio de sesion
    });

    
    loading.dismiss();
    let navigationextras: NavigationExtras={
      state:{
        user:this.user
      }
    }
    this.router.navigate(['/home'],navigationextras)
  }catch (error) {
    console.error(error);
    loading.dismiss();
  }
  }
}
