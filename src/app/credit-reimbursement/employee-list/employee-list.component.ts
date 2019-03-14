import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserCreditService } from 'src/app/shared/services/user-credit.service';
import { PageModel } from 'src/app/shared/model/page.model';
import { UserCreditModel, UserCreditOutputModel, UserCreditInputModel } from 'src/app/shared/model/user-credit.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  ListUserCredit: PageModel<UserCreditOutputModel> = new PageModel<UserCreditOutputModel>();
  queryListUserCredit: UserCreditInputModel = new UserCreditInputModel();

  constructor(
    private toastrService: ToastrService,
    private usercreditService: UserCreditService
  ) { }

  ngOnInit() {
    this.goLogin();
    // 取基本数据
    this.getListOrganization();
  }

  private getListOrganization() {
    this.usercreditService.ListUserCredit(this.queryListUserCredit).subscribe((params) => {
      console.log(params);
      if (params.isSuccess) {
        this.ListUserCredit = params.data;
      } else {
        this.toastrService.error(params.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  goLogin() {
    this.usercreditService.Login().subscribe((params) => {
    });
  }

}
