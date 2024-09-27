import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './component/user-table/user-table.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';
import { UsertypeComponent } from './component/usertype/usertype.component';
import { UserTypeTableComponent } from './component/usertype-table/usertype-table.component';
import { UsertypeFormComponent } from './component/usertype-form/usertype-form.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'userlisttab', component: UserComponent},
  {path: 'typeuserlisttab', component: UsertypeComponent},
  {path: 'users', component: UserTableComponent},
  {path: 'adduser', component: UserFormComponent},
  {path: 'edituser/:id', component: UserFormComponent },
  {path: 'viewuser/:id', component: UserProfileComponent},
  {path:'userstype', component:UserTypeTableComponent},
  {path: 'addusertype', component:UsertypeFormComponent},
  {path: 'editusertype/:id', component:UsertypeFormComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
