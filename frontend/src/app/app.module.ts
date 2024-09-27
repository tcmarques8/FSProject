import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTableComponent } from './component/user-table/user-table.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MenuComponent } from './component/menu/menu.component';
import { UsertypeComponent } from './component/usertype/usertype.component';
import { UserComponent } from './component/user/user.component';
import { HomeComponent } from './component/home/home.component';
import { UserTypeTableComponent } from './component/usertype-table/usertype-table.component';
import { UsertypeFormComponent } from './component/usertype-form/usertype-form.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserFormComponent,
    MenuComponent,
    UsertypeComponent,
    UserComponent,
    HomeComponent,
    UserTypeTableComponent,
    UsertypeFormComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withFetch()), 
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
