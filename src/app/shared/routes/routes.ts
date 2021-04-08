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
        icontype: 'videogame_asset'
    },
    {
        path: '/friendslist',
        title: 'Amigos',
        type: 'link',
        icontype: 'groups'
    }
];
