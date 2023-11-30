import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './guards/no-ingresado.guard';
import { IngresadoGuard } from './guards/ingresado.guard';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'noteblock',
    loadChildren: () => import('./pages/noteblock/noteblock.module').then(m => m.NoteblockPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'mispromedios',
    loadChildren: () => import('./pages/mispromedios/mispromedios.module').then(m => m.MispromediosPageModule),
    canActivate: [IngresadoGuard]
  },

  {
    path: 'tictactoe',
    loadChildren: () => import('./pages/tictactoe/tictactoe.module').then(m => m.TictactoePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'pasatiempos',
    loadChildren: () => import('./pages/pasatiempos/pasatiempos.module').then(m => m.PasatiemposPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'sudoku',
    loadChildren: () => import('./pages/sudoku/sudoku.module').then(m => m.SudokuPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundPageModule),
    canActivate: [NoIngresadoGuard]
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}