import { RouteInfo } from './routes.model';

export const Routes: RouteInfo[] = 
[
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/gameslist',
        title: 'Jogos',
        type: 'link',
        icontype: 'dashboard'
    },

    // {
    //     path: '/administrativo',
    //     title: 'Administrativo',
    //     type: 'sub',
    //     icontype: 'supervisor_account',
    //     collapse: 'administrativo',
    //     children: 
    //     [
    //         {path: 'gameslist', title: 'Jogos', ab:'J'},
    //         // {path: 'apartamentolistar', title: 'Apartamentos', ab:'A'},
    //         // {path: 'apartamentotipolistar', title: 'Apartamentos Tipos', ab:'AT'},
    //         // {path: 'apartamentotipoitemlistar', title: 'Apartamentos Itens', ab:'AI'},
    //         // {path: 'apartamentotipomontagemlistar', title: 'Apartamentos Montagens', ab:'AM'},
    //         // {path: 'tarifariolistar', title: 'Tarifários', ab:'T'},
    //         // {path: 'gestorlistar', title: 'Gestores', ab:'G'},
    //         // {path: 'produtolistar', title: 'Produtos', ab:'P'},
    //         // {path: 'servicolistar', title: 'Servicos', ab:'S'}
    //     ]
    // }
];
