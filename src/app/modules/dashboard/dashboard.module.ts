import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from './../../shared/modules/md/md.module';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { MaterialModule } from './../../app.module';
import { DashboardRoutes } from './dashboard.routing';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxGalleryModule } from 'ngx-gallery';

import { DashboardComponent } from './dashboard.component';

import { LendsService } from './../lend/lends.service';
import { GamesService } from './../game/games.service';
import { FriendsService } from './../friend/friends.service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        NgxGalleryModule       
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        LendsService,
        GamesService,
        FriendsService
    ]
})

export class DashboardModule {}
