import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { coloresBasicos } from '../../app.module'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SpinnersService } from 'src/app/services/util/spinners.service';


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

  // CARGA DE REGISTRO CON EMAIL

  registering = false;

  loginForm: FormGroup;
  mensaje: any = "";
  submitError = "";
  isModalOpen = false;
  constructor(
    private form: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private auth: AuthenticationService,
    private spinner: SpinnersService) {
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



  goHome() {
    this.router.navigate(['/home'])
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
  /**
   * LOGIN Y REGISTER CON GOOGLE
   */
  async loginGoogle() {
    await this.auth.loginGoogle();
  }

  /**
   * LOGIN CON EMAIL Y CONTRASEÑA
   */
  async logIn() {
    await this.spinner.spinner('Iniciando sesión...', 'dots', 1500);
    await this.auth.logIn(this.user.identifier, this.user.password);
  }


  // FUNCIONES PARA EL REGISTRO CON EMAIL

  async register() {
    await this.spinner.spinner('Registrando...', 'dots', 1500);
    this.auth.register(this.userRegistration.identifier, this.userRegistration.password);
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


  // FUNCION PARA EL BOTON DE RETROCEDER
  retroceso() {
    this.router.navigate(['/home']);
  }

}
