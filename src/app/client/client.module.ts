import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    ClientComponent,
    TopbarComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
