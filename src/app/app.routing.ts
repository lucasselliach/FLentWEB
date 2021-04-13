import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

export const AppRoutes: Routes = 
[
    {
        path: '',
        redirectTo: 'login',//'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: 
        [
            {
                path: '',
                loadChildren: './modules/index/index.module#IndexModule'
            }
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [ AuthGuardService ],
        children: 
        [
            {
                path: '',
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: '',
                loadChildren: './modules/game/games.module#GamesModule'
            },
            {
                path: '',
                loadChildren: './modules/friend/friends.module#FriendsModule'
            },
            {
                path: '',
                loadChildren: './modules/lend/lends.module#LendsModule'
            }            
        ]
    } 
];
