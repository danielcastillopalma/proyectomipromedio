import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, inMemoryPersistence, getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  objApp = initializeApp(environment.firebaseConfig);
  objAuth = getAuth(this.objApp);
  //INICIO DE LOGIN GOOGLE
  provider = new GoogleAuthProvider();

  constructor() { }

  async loginGoogle() {
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
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

  async register(identifier, password) {
    setPersistence(this.objAuth, browserLocalPersistence).then(() => {
      createUserWithEmailAndPassword(this.objAuth, identifier, password)
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
    })
  }

  async logOut() {
    setPersistence(this.objAuth, inMemoryPersistence).then(() => {
      

    })

  }

}
