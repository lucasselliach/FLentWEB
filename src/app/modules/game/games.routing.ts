import { Routes } from '@angular/router';

import { GameListComponent } from './gamelist/gamelist.component';
// import { ClienteCriarComponent } from './clientecriar/clientecriar.component';
// import { ClienteDetalharComponent } from './clientedetalhar/clientedetalhar.component';
// import { ClienteEditarComponent } from './clienteeditar/clienteeditar.component';

export const GamesRoutes: Routes = [
    {
        path: '',
        children: 
        [ 
            {
                path: 'gameslist',
                component: GameListComponent
            }
        ]
    }
    // {
    //     path: '',
    //     children: 
    //     [ 
    //         {
    //             path: 'clientecriar',
    //             component: ClienteCriarComponent
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     children: 
    //     [ 
    //         {
    //             path: 'clientedetalhar/:codigo',
    //             component: ClienteDetalharComponent
    //         }
    //     ]
    // },
    // {
    //     path: '',
    //     children: 
    //     [ 
    //         {
    //             path: 'clienteeditar/:codigo',
    //             component: ClienteEditarComponent
    //         }
    //     ]
    // }
];
