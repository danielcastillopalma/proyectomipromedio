import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, getAuth, signOut, updateProfile } from 'firebase/auth';
import { FacebookAuthProvider } from "firebase/auth";
import { AppComponent } from 'src/app/app.component';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { ToastService } from '../util/toast.service';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //INICIO DE LOGIN GOOGLE
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
  public storageKey = 'google_user';

  user: any = null;

  objAuth: any = null;

  constructor(private router: Router, private app: AppComponent, private toast: ToastService) {
    this.verificarLogin();
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  /**
   * Login con google
   */

  async loginGoogle() {
    try {
      this.user = await GoogleAuth.signIn();
      console.log('user:', this.user);

      // Save user data to local storage
      localStorage.setItem(this.storageKey, JSON.stringify(this.user));
      this.router.navigate(['/home']);

  //this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Google sign-in failed:', error);
      this.toast.presentToast(error.code, 'warning');
    }

  }


  /**
   * LOGIN CON FACEBOOK
   */
  async loginFacebook() {
    /**
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      signInWithPopup(this.objAuth, this.facebookProvider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;


          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential!.accessToken;
          this.router.navigate(['/home']);

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
          this.toast.presentToast(error.message, 'warning')

          // ...
        });
    })
         */
  }
  /**
   * LOGIN CORREO PASSWORD
   */
  async logIn(identifier, password) {
    /** 
    await setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(this.objAuth, identifier, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.router.navigate(['/home']);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          this.toast.presentToast(error.message, 'warning')
        });
    })
        */
  }


  // FUNCIONES PARA EL REGISTRO CON EMAIL

  async register(identifier, password, name) {
    /**
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      createUserWithEmailAndPassword(this.objAuth, identifier, password)
        .then((userCredential) => {
          // Signed up 
          updateProfile(this.objAuth.currentUser!, { displayName: name }).then(() => { }).catch((err) => console.log(err))

          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    })
         */
  }

  async logOut() {
    await GoogleAuth.signOut();
    this.user = null;
    localStorage.clear();
  }

  async verificarLogin(){
    if(localStorage.getItem(this.storageKey)){
      this.router.navigate(['/home']);
    }
  }

}
