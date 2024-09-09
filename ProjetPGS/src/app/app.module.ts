import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './Front/head/head.component';
import { BodyComponent } from './Front/body/body.component';
import { FootComponent } from './Front/foot/foot.component';
import { AlltempComponent } from './Front/alltemp/alltemp.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Front/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Front/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderQuantityComponent } from './Front/order-quantity/order-quantity.component';
import { EmissionComponent } from './Front/emission/emission.component';
import { DistanceComponent } from './Front/distance/distance.component';
import { LoyalComponent } from './Front/loyal/loyal.component';
import { ClientQuantityComponent } from './Front/client-quantity/client-quantity.component';
import { CommandesComponent } from './Front/commandes/commandes.component';
import { AboutComponent } from './Front/about/about.component';
import { TeamComponent } from './Front/team/team.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    BodyComponent,
    FootComponent,
    AlltempComponent,
    LoginComponent,
    DashboardComponent,
    OrderQuantityComponent,
    EmissionComponent,
    DistanceComponent,
    LoyalComponent,
    ClientQuantityComponent,
    CommandesComponent,
    AboutComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
