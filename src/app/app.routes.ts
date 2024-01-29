import { Routes } from '@angular/router';
import { BasicosComponent } from './template/basicos/basicos.component';
import { DinamicosComponent } from './template/dinamicos/dinamicos.component';
import { SwitchesComponent } from './template/switches/switches.component';
import { BasicosComponent as BasicosReactive } from './reactive/basicos/basicos.component';
import { DinamicosComponent as DinamicosReactive } from './reactive/dinamicos/dinamicos.component';
import { SwitchesComponent as SwitchesReactive } from './reactive/switches/switches.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


export const routes: Routes = [
    { 
        path: 'template',
        children: [
            { path: 'basicos', component: BasicosComponent },
            { path: 'dinamicos', component: DinamicosComponent},
            { path: 'switches', component: SwitchesComponent}
        ]
      },
      { 
        path: 'reactive',
        children: [
            { path: 'basicos', component: BasicosReactive },
            { path: 'dinamicos', component: DinamicosReactive},
            { path: 'switches', component: SwitchesReactive}
        ]
        
      },
      {
        path: '',
        redirectTo: 'template/basicos',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
];
