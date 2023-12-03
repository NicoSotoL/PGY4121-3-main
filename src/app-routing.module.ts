import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./app/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./app/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restore',
    loadChildren: () => import('./app/restore/restore.module').then( m => m.RestorePageModule)
  },
  {
    path: 'homealumno',
    loadChildren: () => import('./app/homealumno/homealumno.module').then( m => m.HomealumnoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'curso',
    loadChildren: () => import('./app/curso/curso.module').then( m => m.CursoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'page404',
    loadChildren: () => import('./app/page404/page404.module').then( m => m.Page404PageModule)
  },
  { 
    path: '', redirectTo: 'login', pathMatch: 'full' 
  },
  { 
    path: '**', redirectTo: '/page404' 
  },
];


export class AppRoutingModule { }
