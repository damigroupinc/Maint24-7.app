import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractPage } from './contract.page';


const routes: Routes = [
  {
    path: '',
    component: ContractPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ContractRoutingModule,
  ],
  declarations: [ContractPage]
})
export class ContractPageModule {}
