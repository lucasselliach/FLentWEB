import { Routes } from '@angular/router';

import { FriendListComponent } from './friendlist/friendlist.component';
import { FriendCreateComponent } from './friendcreate/friendcreate.component';
import { FriendEditComponent } from './friendedit/friendedit.component';

export const FriendsRoutes: Routes = [
    {
        path: '',
        children: 
        [ 
            {
                path: 'friendslist',
                component: FriendListComponent
            }
        ]
    },
    {
        path: '',
        children: 
        [ 
            {
                path: 'friendcreate',
                component: FriendCreateComponent
            }
        ]
    },
    {
        path: '',
        children: 
        [ 
            {
                path: 'friendedit/:friendid',
                component: FriendEditComponent
            }
        ]
    }
];
