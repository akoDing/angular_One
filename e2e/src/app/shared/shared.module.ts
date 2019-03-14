import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServiceBase } from './services/service-base';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TreeComponent } from './base/tree/tree.component';
import { DropdownTreeviewSelectComponent } from "./base/dropdown-tree/dropdown-treeview-select.component";
import { TreeviewModule } from 'ngx-treeview';
import { DatePickerComponent } from './base/date-picker/date-picker.component';
import { CacheService } from './services/cache.service';
import { LoadingComponent } from "./base/loading/loading.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationComponent } from "./base/pagination/pagination.component";
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';
import { UserTableComponent } from './common/user-table/user-table.component';
import { DeleteConfirmComponent } from './common/delete-confirm/delete-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TreeviewModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    TreeComponent,
    DropdownTreeviewSelectComponent,
    DatePickerComponent,
    LoadingComponent,
    PaginationComponent,
    DisabledOnSelectorDirective,
    UserTableComponent,
    DeleteConfirmComponent
  ],
  exports: [
    TreeComponent,
    DropdownTreeviewSelectComponent,
    DatePickerComponent,
    LoadingComponent,
    PaginationComponent,
    UserTableComponent,
    DeleteConfirmComponent
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:
        [
          /* Service */
          ServiceBase,
          DatePipe,
          CacheService
        ]
    };
  }
}
