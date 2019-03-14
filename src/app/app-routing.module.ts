import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfindComponent } from './content/notfind/notfind.component';
import { NopermissionComponent } from './content/nopermission/nopermission.component';

const routes: Routes = [
  { path: '', redirectTo: '/login4portal', pathMatch: 'full' },
  { path: 'BaseData', loadChildren: './base-data/base-data.module#BaseDataModule' },
  { path: 'CreditReimbursement', loadChildren: './credit-reimbursement/credit-reimbursement.module#CreditReimbursementModule' },
  { path: 'nopermission', component: NopermissionComponent},
  { path: '**', component: NotfindComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
