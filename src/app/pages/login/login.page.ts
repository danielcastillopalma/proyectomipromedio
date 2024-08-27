import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { coloresBasicos } from '../../app.module'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertController } from '@ionic/angular';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss',],
})
export class LoginPage implements OnInit {

  //Inicializar APP firebase

  objApp = initializeApp(environment.firebaseConfig);
  objAuth = getAuth(this.objApp);
  //INICIO DE LOGIN GOOGLE
  provider = new GoogleAuthProvider();

  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  public registrationForm: FormGroup;
  wrongCredentials = "";




  user = {
    identifier: "",
    password: ""
  }
  userRegistration = {
    identifier: "",
    username: "",
    password: ""

  }
  presentingElement = undefined;

  // CARGA DE LOGIN
  loading = false;

  // CARGA DE REGISTRO CON EMAIK

  registering = false;

  loginForm: FormGroup;
  mensaje: any = "";
  submitError = "";
  isModalOpen = false;
  constructor(

    private form: FormBuilder,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertController: AlertController) {
    //constructor
  }

  ngOnInit() {
    this.presentingElement! = document.querySelector('.ion-page')!;
    this.loginForm = this.form.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.createForm();
  }
  createForm() {
    this.registrationForm = this.form.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("^(?=.*?[a-z])(?=.*?[0-9]).{5,30}$")]
        )),

      confirmPassword: new FormControl('',
        Validators.compose([Validators.required])
      ),
    }, {
      validator: this.ConfirmedValidator('password', 'confirmPassword'),

    }
    );
  }
  
  async loginGoogle() {
    signInWithPopup(this.objAuth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }



  ConfirmedValidator(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors) { return; }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  resetForm() {
    this.registrationForm.reset();

    Object.keys(this.registrationForm.controls).forEach((key) => {
      const control = this.registrationForm.controls[key];
      control.setErrors(null);
    });
  }
  
  goHome() {
    this.router.navigate(['/home'])
  }
  // CARGA DE LOGIN
  async logIn() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'dots', // cambiar el tipo de spinner
    });
    await loading.present();

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500); // tiempo para iniciar la sesion
    });
    loading.dismiss();


    signInWithEmailAndPassword(this.objAuth, this.user.identifier, this.user.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
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
    createUserWithEmailAndPassword(this.objAuth, this.userRegistration.identifier, this.userRegistration.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    loading.dismiss();
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
