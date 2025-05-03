import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { IMenuItem } from '../../../data/interfaces/IMenuItem';
import { RouterLink, RouterLinkActive } from '@angular/router';

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  reactiveMenu: IMenuItem[] = reactiveItems
  .filter((item) => item.path !== '**')
  .map( (item) =>  ({
    route: `reactive/${item.path}`,
    title: `${item.title}`
  }));

  authMenu: IMenuItem[] = [
    {
      title: 'Registro',
      route: './auth'
    }
  ];

  countryMenu: IMenuItem[] = [
    {
      title: 'Paises',
      route: './country'
    }
  ];

}
