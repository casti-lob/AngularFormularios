import { Routes } from "@angular/router";
import { Component } from '@angular/core';
import { BasicosComponent } from "./basicos/basicos.component";
import { DinamicosComponent } from "./dinamicos/dinamicos.component";
import { SwitchesComponent } from "./switches/switches.component";

export const routes: Routes =[
    {path:'basicos', component: BasicosComponent},
    {path: 'dinamicos', component:DinamicosComponent},
    {path:'switches', component: SwitchesComponent},
    {path:'**', redirectTo: 'basicos'}

]