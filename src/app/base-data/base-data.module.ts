import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDataRoutingModule } from './base-data-routing.module';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RoleAuthorizationComponent } from './role-authorization/role-authorization.component';

@NgModule({
  declarations: [OrganizationListComponent, UserManagementComponent, RoleManagementComponent, RoleAuthorizationComponent],
  imports: [
    CommonModule,
    BaseDataRoutingModule,
    FormsModule,
    SharedModule.forRoot()
  ]
})
export class BaseDataModule { }
