import { Routes } from '@angular/router';

import { GameListComponent } from './gamelist/gamelist.component';
import { GameCreateComponent } from './gamecreate/gamecreate.component';
import { GameEditComponent } from './gameedit/gameedit.component';

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
    },
    {
        path: '',
        children: 
        [ 
            {
                path: 'gamecreate',
                component: GameCreateComponent
            }
        ]
    },
    {
        path: '',
        children: 
        [ 
            {
                path: 'gameedit/:gameid',
                component: GameEditComponent
            }
        ]
    }
];
