import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, inMemoryPersistence, getAuth, signOut, updateProfile } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { FacebookAuthProvider } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  objApp = initializeApp(environment.firebaseConfig);
  objAuth = getAuth(this.objApp);
  //INICIO DE LOGIN GOOGLE
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();

  constructor(private router: Router) { }

  async loginGoogle() {
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      signInWithPopup(this.objAuth, this.googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
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
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(this.objAuth, identifier, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          console.log(user);
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
