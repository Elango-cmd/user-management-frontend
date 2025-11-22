import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { UserList } from './users/user-list/user-list';
import { UserDetail } from './users/user-detail/user-detail';
import { UserEdit } from './users/user-edit/user-edit';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'users', component: UserList },
  { path: 'users/:id', component: UserDetail },
  { path: 'users/edit/:id', component: UserEdit },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
