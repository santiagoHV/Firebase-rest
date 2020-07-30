import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './pages/gestor/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { UserListaComponent } from './pages/lista/user-lista/user-lista.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'admin/user', component: UserListaComponent
  },
  {
    path: 'admin/user/:id', component: UserComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
