import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { CorsRequest } from 'cors';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  msj = ""

  userData: any;
  constructor(
    private http: HttpClient, private storageService: StorageService, private router: Router) {
    console.log(this.storageService.get("key").then(res => console.log(res), err => console.log(err)))

  }

  getUserData() {
    return this.http.get("https://strapi-production-4838.up.railway.app/api/users/me")
  }
  async getNotasAritmeticas() {
    this.userData = JSON.parse(localStorage.getItem('usuario')!);
    const options = {
      url: 'https://strapi-production-4838.up.railway.app/api/aritmeticos?filters[avgemail][$eq]=' + this.userData.user.email,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${this.userData.jwt} `,        
        "Bearer-Token": this.userData.jwt,
      },
    };
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      return response.data;
    }
    catch (e) {
      console.log(e)
      return;
    }
  }

  async guardarNotaArit(nombre: string, notas: string, email: string) {
    email = "dcastillo@gmail.com"
    const obj = {
      "data": {
        "avgtitle": nombre,
        "avgemail": email,
        "notas": notas
      }
    }
    const options = {
      url: 'https://strapi-production-4838.up.railway.app/api/aritmeticos',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(obj),
    };

    try {
      console.log(obj)
      const response: HttpResponse = await CapacitorHttp.post(options);
      return response.data;
    }
    catch (e) {
      console.log(e)
      return;
    }
  }

}

