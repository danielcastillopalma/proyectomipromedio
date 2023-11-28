import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { CorsRequest } from 'cors';
import { AuthenticationService } from './authentication.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  msj = ""
  key = "";
  userData: any;
  constructor(private toastCtrl: ToastController,
    private http: HttpClient, private storageService: StorageService, private router: Router) {
    

  }

  getUserData() {
    return this.http.get("https://strapi-production-1151.up.railway.app/api/users/me")
  }


  async getNotasAritmeticas() {

    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    await this.storageService.get("token").then((res) => { this.key = res }, err => console.log(err));
    
    const options = {
      url: 'https://strapi-production-1151.up.railway.app/api/aritmeticos?filters[avgemail][$eq]=' + this.userData.user.email,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.key} `
      },
    };
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);     
      return response.data;
    }
    catch (e) {
      return;
    }
  }
  async getNotasPonderadas() {

    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    await this.storageService.get("token").then((res) => { this.key = res }, err => console.log(err));
    
    const options = {
      url: 'https://strapi-production-1151.up.railway.app/api/ponderados?filters[avgemail][$eq]=' + this.userData.user.email,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.key} `
      },
    };
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);     
      return response.data;
    }
    catch (e) {
      return;
    }
  }

  async guardarNotaArit(nombre: string, notas: string, email: string) {
    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    await this.storageService.get("token").then((res) => { this.key = res }, err => console.log(err));
    
    const obj = {
      "data": {
        "avgtitle": nombre,
        "avgemail": email,
        "notas": notas
      }
    }
    const options = {
      url: 'https://strapi-production-1151.up.railway.app/api/aritmeticos',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.key} `
      },
      data: JSON.stringify(obj),
    };


    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      this.presentToast("Promedio guardado con exito");
      return response.data;
    }
    catch (e) {
      return;
    }
  }

  async guardarNotaPonde(nombre: string, notas: string, email: string) {
    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    await this.storageService.get("token").then((res) => { this.key = res }, err => console.log(err));
    
    const obj = {
      "data": {
        "avgtitle": nombre,
        "avgemail": email,
        "notas": notas
      }
    }
    const options = {
      url: 'https://strapi-production-1151.up.railway.app/api/ponderados',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.key} `
      },
      data: JSON.stringify(obj),
    };
    

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      this.presentToast("Promedio guardado con exito");
      return response.data;
    }
    catch (e) {
      return;
    }
  }
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

