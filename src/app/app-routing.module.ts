import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', redirectTo: 'tutorial', pathMatch: 'full' },
 
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'recover', loadChildren: './recover/recover.module#RecoverPageModule' },
  { path: 'changepass', loadChildren: './changepass/changepass.module#ChangepassPageModule' },
  { path: 'startorder/:id', loadChildren: './startorder/startorder.module#StartorderPageModule' },
  { path: 'closeorder/:id', loadChildren: './closeorder/closeorder.module#CloseorderPageModule' },
  { path: 'approveorder/:id', loadChildren: './approveorder/approveorder.module#ApproveorderPageModule' },
  { path: 'pictures/:id', loadChildren: './pictures/pictures.module#PicturesPageModule' },
  { path: 'history/:id', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'neworder/:id', loadChildren: './neworder/neworder.module#NeworderPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'movein', loadChildren: './movein/movein.module#MoveinPageModule' },
  { path: 'moveout', loadChildren: './moveout/moveout.module#MoveoutPageModule' },
  { path: 'lista', loadChildren: './lista/lista.module#ListaPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'infocontract', loadChildren: './infocontract/infocontract.module#InfocontractPageModule' },
  { path: 'viewservices/:id', loadChildren: './viewservices/viewservices.module#ViewservicesPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'units', loadChildren: './units/units.module#UnitsPageModule' },
  { path: 'contract', loadChildren: './contract/contract.module#ContractPageModule' },
  { path: 'contract-info', loadChildren: './contract-info/contract-info.module#ContractInfoPageModule' },
  { path: 'contract-details', loadChildren: './contract-details/contract-details.module#ContractDetailsPageModule' },
  { path: 'contract-finance', loadChildren: './contract-finance/contract-finance.module#ContractFinancePageModule' },
  { path: 'contract-date', loadChildren: './contract-date/contract-date.module#ContractDatePageModule' },
  { path: 'payments', loadChildren: './payments/payments.module#PaymentsPageModule' },
  { path: 'finance', loadChildren: './finance/finance.module#FinancePageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'wizprofile', loadChildren: './wizprofile/wizprofile.module#WizprofilePageModule' },
  { path: 'avatar', loadChildren: './avatar/avatar.module#AvatarPageModule' },
]
  
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
