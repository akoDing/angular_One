import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SingleRecordComponent } from './single-record/single-record.component';

const routes: Routes = [
  { path: 'EmployeeList',  component: EmployeeListComponent },
  { path: 'SingleRecord',  component: SingleRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditReimbursementRoutingModule { }
