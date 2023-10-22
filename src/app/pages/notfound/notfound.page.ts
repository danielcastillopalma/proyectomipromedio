import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
})
export class NotfoundPage implements OnInit {

  constructor(private animationCtrl: AnimationController, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const notFoundTitle = document.querySelector('.not-found-title');
  
    if (notFoundTitle) {
      const animation: Animation = this.animationCtrl.create()
        .addElement(notFoundTitle)
        .duration(2000)
        .iterations(Infinity)
        .fromTo('transform', 'rotate(0deg)', 'rotate(360deg');
  
      animation.play();
    }
  }
    goToHome() {
      
      this.router.navigateByUrl('/home'); // Ajusta la ruta de acuerdo a tu configuración
    }
  
  }

