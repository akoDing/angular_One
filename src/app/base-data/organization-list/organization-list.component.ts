import { Component, OnInit } from '@angular/core';
import { OrganizationInputModel, OrganizationOutputModel } from 'src/app/shared/model/organization.model';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { PageModel } from 'src/app/shared/model/page.model';
import { ResultModel } from 'src/app/shared/model/result.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';
import { UserInputModel, UserOutputModel } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  public departNo: number;

  public departName: string;

  organizationID: string;
  //用来修改、添加
  organizationInputModel: OrganizationInputModel;
  //用来接收单条信息
  organizationOuputModel: OrganizationOutputModel;
  //用来接收多条信息
  standards: PageModel<OrganizationOutputModel>;
  //用来查询
  queryCondition: OrganizationInputModel;
  //分页数量
  pageSize: number;

  // user返回的多条信息
  standardsByUser: PageModel<UserOutputModel>;
  // 用来查询user
  queryConditionByUser: UserInputModel;

  constructor(
    private organizationService: OrganizationService,
    private toastrService: ToastrService,
    private userService: UserService,
  ) {
    this.standards = new PageModel<OrganizationOutputModel>();
    this.queryCondition = new OrganizationInputModel();
    this.organizationInputModel = new OrganizationInputModel();
    this.standardsByUser = new PageModel<UserOutputModel>();
    this.queryConditionByUser = new UserInputModel();
    this.queryConditionByUser.pageNO = 1;
    this.queryConditionByUser.pageSize = 10;
  }

  ngOnInit() {
    this.pageSize = 5;
    this.queryCondition.isEnabled = null;
    this.onListSelect();
  }


  Depart_edit() {
    this.departNo = 1001
    this.departName = "财务部"
  }

  //分页
  onPageChange(pageNO) {
    this.queryCondition.pageNO = pageNO;
    this.listOrganization();
  }

  //user分页
  onPageChangeByUser(pageNO) {
    this.queryConditionByUser.pageNO = pageNO;
    this.listUser();
  }

  onEmpty() {
    this.organizationID = null;
    this.organizationInputModel = new OrganizationInputModel();
    this.organizationInputModel.isEnabled = true;
  }

  //查询单条信息
  onGetSelect(organizationID) {
    this.organizationID = organizationID;
    this.getOrganization();
  }
  //查询多条信息
  onListSelect() {
    this.queryCondition.pageSize = this.pageSize;
    this.queryCondition.pageNO = this.standards.pageNO;
    this.listOrganization();
  }

  onSave() {
    if (this.organizationID == null) {
      this.createOrganization();
    } else {
      this.modifyOrganization();
    }
  }

  onDelete(organizationID) {
    this.organizationID = organizationID;
  }

  ondeleteClk() {
    this.removeOrganization();
  }
  onSelectUser(organizationID: string) {
    this.queryConditionByUser.organizationID = organizationID;
    this.queryConditionByUser.pageNO = 1;
    this.listUser();
  }
  //查询单条信息
  private getOrganization() {
    this.organizationService.getOrganization(this.organizationID).subscribe((e: ResultModel<OrganizationOutputModel>) => {
      if (e.isSuccess) {
        this.organizationInputModel.organizationID = this.organizationID;
        this.organizationInputModel.organizationName = e.data.organizationName;
        this.organizationInputModel.organizationCode = e.data.organizationCode;
        this.organizationInputModel.isEnabled = e.data.isEnabled;
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    })
  }

  //查询多条信息
  private listOrganization() {
    this.organizationService.listOrganization(this.queryCondition)
      .subscribe((e: ResultModel<PageModel<OrganizationOutputModel>>) => {
        if (e.isSuccess) {
          this.standards = e.data;
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      })
  }

  //添加一条信息
  private createOrganization() {
    this.organizationService.createOrganization(this.organizationInputModel).subscribe((e: ResultModel<OrganizationOutputModel>) => {
      if (e.isSuccess) {
        this.toastrService.success("添加成功！", 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $("#edit").modal('hide');
        this.organizationOuputModel = e.data;
        this.listOrganization();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    })
  }

  //修改一条信息
  private modifyOrganization() {
    this.organizationService.modifyOrganization(this.organizationInputModel).subscribe((e: ResultModel<OrganizationOutputModel>) => {
      if (e.isSuccess) {
        this.toastrService.success("修改成功！", 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $("#edit").modal('hide');
        this.organizationOuputModel = e.data;
        this.onEmpty();
        this.listOrganization();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    })
  }

  //删除一条信息
  private removeOrganization() {
    this.organizationService.removeOrganization(this.organizationID).subscribe((e: ResultModel<number>) => {
      if (e.isSuccess) {
        this.toastrService.success("删除成功！", 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $("#delete").modal('hide');
        this.listOrganization();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    })
  }


  // 同步信息
  // private synchronizeOrganization() {
  //   this.organizationService.synchronizeOrganization().subscribe((e:ResultModel<>)=>{
  //     if (e.isSuccess){
  //       this.toastrService.success("同步信息成功！", 'Success!', {
  //         positionClass: 'toast-top-center',
  //         timeOut: 3000, closeButton: true
  //       });
  //     }else{
  //       this.toastrService.error(e.errorMessage, 'Error!', {
  //         positionClass: 'toast-top-center',
  //         timeOut: 3000, closeButton: true
  //       });
  //     }
  //   })
  // }



  // 查询多条信息user
  private listUser() {
    this.userService.listUser(this.queryConditionByUser)
      .subscribe((e: ResultModel<PageModel<UserOutputModel>>) => {
        if (e.isSuccess) {
          this.standardsByUser = e.data;
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      });
  }

}
