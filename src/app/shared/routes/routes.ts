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
    },
    {
        path: '/lendslist',
        title: 'Empréstimos',
        type: 'link',
        icontype: 'perm_contact_calendar'
    }
];
