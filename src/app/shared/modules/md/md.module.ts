
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdTableComponent } from './md-table/md-table.component';
import { MdChartComponent } from './md-chart/md-chart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MdTableComponent,
    MdChartComponent
  ],
  exports: [
    MdTableComponent,
    MdChartComponent
  ]
})
export class MdModule { }
