import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { MaterialModule } from '../../app.module';
import { FriendsRoutes } from './friends.routing';

import { FriendListComponent } from './friendlist/friendlist.component';
import { FriendCreateComponent } from './friendcreate/friendcreate.component';
import { FriendEditComponent } from './friendedit/friendedit.component';

import { FriendsService } from './friends.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FriendsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
    FriendListComponent,
    FriendCreateComponent,
    FriendEditComponent
  ],
  providers: [
    FriendsService
  ]
})

export class FriendsModule {}
