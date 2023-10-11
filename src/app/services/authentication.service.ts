import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  msj="";
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  token = '';
  constructor(private db: DatabaseService,private storageService: StorageService, private router: Router) { 
    this.loadToken();
  }
  async loadToken(){
    const token=await this.storageService.get("token");
    if(token){
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
    }
  }
  async registerUser(formData)
  {
      if(!formData) return;

      const options = {
        url: 'https://strapi-production-4838.up.railway.app/api/auth/local/register', 
        headers: { 'Content-Type': 'application/json'  },       
        data: JSON.stringify(formData),
      };
    
      try{
        const response: HttpResponse = await CapacitorHttp.post(options);        
        return response.data; 
      }
      catch(e)
      {
        return;
      }     
  }
  async login(formData){
    
    if(!formData) return;
    const options={
      url:'https://strapi-production-4838.up.railway.app/api/auth/local/',
      headers:{'Content-Type':'application/json'},
      data:JSON.stringify(formData)
    };
   
    try{
  
      
      const response:HttpResponse=await CapacitorHttp.post(options);
      const res=response.data;

      console.log(res)
      console.log(res.jwt)
      if(res&&res.jwt){
        console.log("funciona");
        this.storageService.set("token",res.jwt);
        this.isAuthenticated.next(true);        
        this.router.navigateByUrl('/home',{replaceUrl:true})      
        localStorage.setItem('usuario',JSON.stringify(res));
        return;  
      }else{
        this.msj="Credenciales invalidas"
        return (this.msj);
      }
    }catch(e){
      
      return;
      
    }
  }
}
