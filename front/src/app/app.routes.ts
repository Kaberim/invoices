import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/info/info.component').then(m => m.InfoComponent)
  },
  { path: '**', redirectTo: '/list' }
];
