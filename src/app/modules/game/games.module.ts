import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { MaterialModule } from '../../app.module';
import { GamesRoutes } from './games.routing';

import { GameListComponent } from './gamelist/gamelist.component';
// import { ClienteCriarComponent } from './clientecriar/clientecriar.component';
// import { ClienteDetalharComponent } from './clientedetalhar/clientedetalhar.component';
// import { ClienteEditarComponent } from './clienteeditar/clienteeditar.component';

import { GamesService } from './games.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GamesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
    GameListComponent,
    // ClienteCriarComponent,
    // ClienteDetalharComponent,
    // ClienteEditarComponent
  ],
  providers: [
    GamesService
  ]
})

export class GamesModule {}
