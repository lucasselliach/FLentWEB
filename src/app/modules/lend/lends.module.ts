import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { MaterialModule } from '../../app.module';
import { LendsRoutes } from './lends.routing';

import { LendListComponent } from './lendlist/lendlist.component';
import { LendCreateComponent } from './lendcreate/lendcreate.component';

import { LendsService } from './lends.service';
import { GamesService } from './../game/games.service';
import { FriendsService } from './../friend/friends.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LendsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
    LendListComponent,
    LendCreateComponent
  ],
  providers: [
    LendsService,
    GamesService,
    FriendsService
  ]
})

export class LendsModule {}
