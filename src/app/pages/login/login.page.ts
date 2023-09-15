import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, LoadingController, ToastController} from '@ionic/angular';
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
  
  // CARGA DE LOGIN
  loading = false;

  // CARGA DE REGISTRO CON EMAIK

  registering = false;



  constructor(private router: Router,private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

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

  // CARGA DE LOGIN
  async logIn(){
    console.log(this.user);
     
  const loading = await this.loadingCtrl.create({
    message: 'Iniciando sesión...',
    spinner: 'dots', // cambiar el tipo de spinner
  });
  await loading.present();

  try {
    
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        

        
        resolve();
      }, 1500); // tiempo para iniciar la sesion
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
  
// FUNCION PARA EL BOTON DE RETROCEDER
  retroceso() {
    this.router.navigate(['/home']);
  }

// FUNCIONES PARA EL REGISTRO CON EMAIL

async register() {
  const loading = await this.loadingCtrl.create({
    message: 'Registrando...', 
    spinner: 'dots', 
    
  });

  await loading.present();


  try {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        
        resolve();
      }, 1000); 
    });

    loading.dismiss(); 
    this.presentToast('Registrado ✓'); // mostrar toast
  } catch (error) {
    console.error(error);
    loading.dismiss(); 
  }
}

// Función para mostrar un toast
async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message: message,
    duration: 2000, // la duracion toast 
    position: 'bottom', // en donde va el toast
    color: 'success', // 
  });
  toast.present();
}


}
