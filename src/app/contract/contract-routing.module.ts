import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractPage } from './contract.page';

const routes: Routes = [
  {
    path: 'contract',
    component: ContractPage,
    children: [
      {
        path: 'contractdetails',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contract-details/contract-details.module').then(m => m.ContractDetailsPageModule)
          }
        ]
      },
      {
        path: 'contractinfo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contract-info/contract-info.module').then(m => m.ContractInfoPageModule)
          }
        ]
      },
      {
        path: 'contractfinance',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contract-finance/contract-finance.module').then(m => m.ContractFinancePageModule)
          }
        ]
      },
      {
        path: 'contractdate',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contract-date/contract-date.module').then(m => m.ContractDatePageModule)            
          }
        ]
      },
      {
        path: '',
        redirectTo: '/contract/contract',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/contract/contract',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule {}
