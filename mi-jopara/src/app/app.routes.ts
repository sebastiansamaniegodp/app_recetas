import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'inicio',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./inicio/inicio.page').then((m) => m.InicioPage),
          },
          {
            path: 'detalle/:id',
            loadComponent: () =>
              import('./inicio/detalle/detalle.page').then(
                (m) => m.DetallePage
              ),
          },
        ],
      },
      {
        path: 'coleccion',
        loadComponent: () =>
          import('./coleccion/coleccion.page').then((m) => m.ColeccionPage),
      },
      {
        path: 'mis-recetas',
        loadComponent: () => import('./mis-recetas/mis-recetas.page').then((m) => m.MisRecetasPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];
