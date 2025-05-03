import { Routes } from "@angular/router";
import { BasicPageComponent } from "./pages/basic-page/basic-page.component";
import { DinamycPageComponent } from "./pages/dinamyc-page/dinamyc-page.component";
import { SwitchesPageComponent } from "./pages/switches-page/switches-page.component";


export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPageComponent
      },
      {
        path: 'dynamic',
        title: 'Dinámicos',
        component: DinamycPageComponent
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPageComponent
      },
      {
        path: '**',
        redirectTo: 'basic'
      }
    ]
  }
]
