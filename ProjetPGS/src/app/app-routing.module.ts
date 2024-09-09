import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './Front/body/body.component';
import { AlltempComponent } from './Front/alltemp/alltemp.component';
import { LoginComponent } from './Front/login/login.component';
import { DashboardComponent } from './Front/dashboard/dashboard.component';
import { OrderQuantityComponent } from './Front/order-quantity/order-quantity.component';
import { EmissionComponent } from './Front/emission/emission.component';
import { DistanceComponent } from './Front/distance/distance.component';
import { LoyalComponent } from './Front/loyal/loyal.component';
import { ClientQuantityComponent } from './Front/client-quantity/client-quantity.component';
import { CommandesComponent } from './Front/commandes/commandes.component';
import { AboutComponent } from './Front/about/about.component';
import { TeamComponent } from './Front/team/team.component';

const routes: Routes = [

{
  path:'user',component:AlltempComponent,
  children:[
    {
      path:'home',component:DashboardComponent
    },
    {path:'OrderQuantity',component:OrderQuantityComponent},
    
{
  path:'emission',component:EmissionComponent
},
{
  path:'distance',component:DistanceComponent
},
{
  path:'loyal',component:LoyalComponent
},
{
  path:'clientQ',component:ClientQuantityComponent
},
{
  path:'commande',component:CommandesComponent
},
{path:'body',component:BodyComponent},
{path:'about',component:AboutComponent},
{path:'team',component:TeamComponent}
   
  ]
},
{
  path:'login',component:LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
