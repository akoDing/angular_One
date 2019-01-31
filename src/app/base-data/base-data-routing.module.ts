import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RoleAuthorizationComponent } from './role-authorization/role-authorization.component';

const routes: Routes = [
  { path: 'OrganizationList',  component: OrganizationListComponent },
  { path: 'UserManagement',  component: UserManagementComponent },
  { path: 'RoleManagement',  component: RoleManagementComponent },
  { path: 'RoleAuthorization',  component: RoleAuthorizationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseDataRoutingModule { }
