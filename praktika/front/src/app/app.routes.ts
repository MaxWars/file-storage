import { Routes } from '@angular/router';
import { Login } from './login/login';
import { FileList } from './file-list/file-list';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'files', component: FileList, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

