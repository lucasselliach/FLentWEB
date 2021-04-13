import { Routes } from '@angular/router';

import { LendListComponent } from './lendlist/lendlist.component';
import { LendCreateComponent } from './lendcreate/lendcreate.component';

export const LendsRoutes: Routes = [
    {
        path: '',
        children: 
        [ 
            {
                path: 'lendslist',
                component: LendListComponent
            }
        ]
    },
    {
        path: '',
        children: 
        [ 
            {
                path: 'lendcreate',
                component: LendCreateComponent
            }
        ]
    }
];
