import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
export interface Usuario {
  id?: number;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  phone?: number;
  birthday?: Date;
  profilePicture?: {
    formats: {
      small: {
        url: string;
      };
    };
  };
}
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  API = "";
  msj = "";
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  token = '';
  constructor(
    private db: DatabaseService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient) {

    this.loadToken();
  }
  createUser(email: string, username: string) {
    this.API = "https://strapi-production-4838.up.railway.app/api/usersdata"
    console.log("ACA entra")
    return this.http.post(this.API, {
      "data": {
        email, username,
      }
    });

  }
  async loadToken() {
    const token = await this.storageService.get("token");
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  async logout() {
    this.isAuthenticated.next(false);
    await this.storageService.remove("token");
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => { this.router.navigate(["login"]); });

  }



  async registerUser(formData) {
    if (!formData) return;

    const options = {
      url: 'https://strapi-production-4838.up.railway.app/api/auth/local/register',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(formData),
    };

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      //this.registerUser2(formData);
      return response.data;
    }
    catch (e) {
      return;
    }
  }
  async registerUser2(formData) {
    if (!formData) return;
    const obj = { "email": formData.email, "username": formData.username }
    const options = {
      url: 'https://strapi-production-4838.up.railway.app/api/usersdata',
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
  async login(formData) {

    if (!formData) return;
    const options = {
      url: 'https://strapi-production-4838.up.railway.app/api/auth/local/',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(formData)
    };

    try {


      const response: HttpResponse = await CapacitorHttp.post(options);
      const res = response.data;

      console.log(res)
      console.log(res.jwt)
      if (res && res.jwt) {
        console.log("funciona");
        this.storageService.set("token", res.jwt);
        this.isAuthenticated.next(true);
        this.router.navigate(['/home']);
        localStorage.setItem('usuario', JSON.stringify(res));
        return;
      } else {
        this.msj = "Credenciales invalidas"
        return (this.msj);
      }
    } catch (e) {

      return;

    }
  }
}
