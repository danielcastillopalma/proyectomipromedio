import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, getAuth, signOut, updateProfile } from 'firebase/auth';
import { FacebookAuthProvider } from "firebase/auth";
import { AppComponent } from 'src/app/app.component';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  objAuth = getAuth(this.app.objApp);
  //INICIO DE LOGIN GOOGLE
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();

  constructor(private router: Router, private app: AppComponent) { }
  /**
   * Login con google
   */

  async loginGoogle() {
    try {
      const user = await GoogleAuth.signIn();
      console.log('Usuario:', user);
      // Aquí puedes manejar el usuario autenticado
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  }
  async loginGoogle2() {
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      signInWithPopup(this.objAuth, this.googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          // The signed-in user info.
          const user = result.user;
          this.router.navigate(['/home']);
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
    })
  }
  /**
   * LOGIN CON FACEBOOK
   */
  async loginFacebook() {
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      signInWithPopup(this.objAuth, this.facebookProvider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential!.accessToken;

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

          // ...
        });
    })
  }
  /**
   * LOGIN CORREO PASSWORD
   */
  async logIn(identifier, password) {
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
        });
    })
  }


  // FUNCIONES PARA EL REGISTRO CON EMAIL

  async register(identifier, password, name) {
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
  }

  async logOut() {
    signOut(this.objAuth).then(() => {
      // Sign-out successful.
      this.router.navigate(['/login']);
    }).catch((error) => {
      // An error happened.
    });

  }

}
