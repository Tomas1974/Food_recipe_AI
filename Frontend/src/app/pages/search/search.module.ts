import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpamPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpamPageRoutingModule
  ],
  declarations: [SearchPage]
})
export class SpamPageModule {}
