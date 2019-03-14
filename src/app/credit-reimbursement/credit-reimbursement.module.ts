import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreditReimbursementRoutingModule } from './credit-reimbursement-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SingleRecordComponent } from './single-record/single-record.component';

@NgModule({
  declarations: [EmployeeListComponent, SingleRecordComponent],
  imports: [
    CommonModule,
    CreditReimbursementRoutingModule,
    FormsModule,
    SharedModule.forRoot()
  ]
})
export class CreditReimbursementModule { }
