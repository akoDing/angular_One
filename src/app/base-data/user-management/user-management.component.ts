import { Component, OnInit, Output, OnChanges } from '@angular/core';
import { UserInputModel, UserOutputModel } from 'src/app/shared/model/user.model';
import { UserRoleInputModel } from 'src/app/shared/model/userRole.model';
import { OrganizationInputModel, OrganizationOutputModel } from 'src/app/shared/model/organization.model';
import { PositionOutputModel } from 'src/app/shared/model/position.model';
import { UserService } from 'src/app/shared/services/user.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { ExtendService } from 'src/app/shared/services/extend.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { PageModel } from 'src/app/shared/model/page.model';
import { ResultModel } from 'src/app/shared/model/result.model';
import { ToastrService } from 'ngx-toastr';
import { SynchronizeModel } from 'src/app/shared/model/synchronize.model';
import { ExtendOutputModel } from 'src/app/shared/model/extend.model';
import { RoleInputModel, RoleOutputModel } from 'src/app/shared/model/role.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {

  // 当前操作ID
  userID: string;
  // 修改、添加 參數model
  userInputModel: UserInputModel;
  // 返回的单条信息
  userOutputModel: UserOutputModel;
  // 返回的多条信息
  standards: PageModel<UserOutputModel>;
  // 查询參數model
  queryCondition: UserInputModel;
  // 分頁參數
  pageSize = 10;
  // 查询的角色ID
  roleID: string;
  userRole: UserRoleInputModel;
  // 值角色list
  userRoleList: Array<UserRoleInputModel>;
  // 组织list
  organizationList: Array<OrganizationOutputModel>;
  // 组织list
  positionList: Array<PositionOutputModel>;
  // 扩展list
  extendList: Array<ExtendOutputModel>;
  // 扩展展示list
  extendEditList: Array<ExtendOutputModel>;
  // 所有角色list
  roleList: Array<RoleOutputModel>;
  // 绑定页面的角色val
  editRoles: Array<any>;
  data2: Array<any>;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private organizationService: OrganizationService,
    private positionService: PositionService,
    private extendService: ExtendService,
    private roleService: RoleService,
  ) {
    this.standards = new PageModel<UserOutputModel>();
    this.queryCondition = new UserInputModel();
    this.queryCondition.pageNO = 1;
    this.userInputModel = new UserInputModel();
    this.organizationList = new Array<OrganizationOutputModel>();
  }

  ngOnInit() {
    // 初始化话列表数据
    this.onListSelect();
    this.listOrganization();
    this.listPosition();
    this.listExtend();
    this.listRole();
    this.queryCondition.userType = '';
  }

  // 添加事件
  onCreateUser() {
    this.userID = null;
    this.userInputModel = new UserInputModel();
    this.editRoles = [];
    this.extendEditList = new Array<ExtendOutputModel>();
    $('#user-edit').modal('show');
  }

  // 获取修改操作的userID
  oneditClk(event) {
    this.userID = event;
    this.userInputModel = new UserInputModel();
    this.editRoles = [];
    this.extendEditList = new Array<ExtendOutputModel>();
    this.getUser();
  }

  // 保存事件
  onSaveUser() {
    this.userInputModel.userID = this.userID;
    // 验证非空
    if (this.userInputModel.userNO === undefined) {
      this.showWarning('工号不能为空');
      return;
    }
    if (this.userInputModel.userName === undefined) {
      this.showWarning('姓名不能为空');
      return;
    }
    if (this.userInputModel.userType === undefined) {
      this.showWarning('请选择用户状态');
      return;
    }
    // 绑定角色关系
    this.userRoleList = new Array<UserRoleInputModel>();
    this.editRoles.forEach(element => {
      this.userRole = new UserRoleInputModel();
      this.userRole.roleID = element;
      this.userRoleList.push(this.userRole);
    });
    this.userInputModel.userRoleModel = this.userRoleList;
    for (let index = 1; index <= 10; index++) {
      this.userInputModel['extend' + index] = this.jsonOrStrToStr(this.userInputModel['extend' + index]);
    }
    if (this.userID === null) {
      this.createUser();
    }
    if (this.userID !== null) {
      this.modifyUser();
    }
    this.saveError();
  }

  // 获取删除操作的userID
  onBundingdeleteClk(event) {
    this.userID = event.userID;
  }

  // 确认删除事件
  ondeleteClk() {
    this.removeUser();
  }

  // 获取重置密码操作的userID
  onpasswordRClk(event) {
    this.userID = event;
    this.resetUserPassword();
  }

  // 分页
  onPageChange(pageNO) {
    this.queryCondition.pageNO = pageNO;
    this.listUser();
  }

  // 查询多条信息
  onListSelect() {
    this.queryCondition.pageSize = this.pageSize;
    if (this.roleID !== undefined && this.roleID !== 'undefined') {
      this.userRoleList = new Array<UserRoleInputModel>();
      this.userRole = new UserRoleInputModel();
      this.userRole.roleID = this.roleID;
      this.userRoleList.push(this.userRole);
    } else {
      this.userRoleList = null;
    }
    if (this.queryCondition.userType === undefined || this.queryCondition.userType === 'undefined') {
      this.queryCondition.userType = null;
    }
    this.queryCondition.userRoleModel = this.userRoleList;
    this.listUser();
  }

  onSynchronizationUser() {
    this.synchronizationUser();
  }

  // 选择角色事件
  onRoleChange() {
    const list = this.editRoles;
    this.editRoles = [];
    list.forEach(element => {
      this.editRoles.push(element.id);
    });
    this.selectExtend();
  }

  // 选择扩展字段事件
  onExtendChange(extendNO: string) {
    const list = this.userInputModel[extendNO];
    this.userInputModel[extendNO] = [];
    list.forEach(element => {
      this.userInputModel[extendNO].push(element.id);
    });
  }

  // 查询单条信息
  private getUser() {
    this.userService.getUser(this.userID).subscribe((e: ResultModel<UserOutputModel>) => {
      if (e.isSuccess) {
        this.userOutputModel = e.data;
        this.bundingUserEdit();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  // 查询多条信息
  private listUser() {
    this.userService.listUser(this.queryCondition)
      .subscribe((e: ResultModel<PageModel<UserOutputModel>>) => {
        if (e.isSuccess) {
          this.standards = e.data;
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      });
  }

  // 查询所有部门
  private listOrganization() {
    this.organizationService.listOrganization(new OrganizationInputModel())
      .subscribe((e: ResultModel<PageModel<OrganizationOutputModel>>) => {
        if (e.isSuccess) {
          this.organizationList = e.data.listData;
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      });
  }

  // 查询所有职位
  private listPosition() {
    this.positionService.listPosition()
      .subscribe((e: ResultModel<Array<PositionOutputModel>>) => {
        if (e.isSuccess) {
          this.positionList = e.data;
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      });
  }

  // 查询所有扩展
  private listExtend() {
    this.extendService.listExtend()
      .subscribe((e: ResultModel<Array<ExtendOutputModel>>) => {
        if (e.isSuccess) {
          this.extendList = e.data;
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      });
  }

  // 查询所有角色
  private listRole() {
    this.roleService.listRole(new RoleInputModel())
      .subscribe((e: ResultModel<Array<RoleOutputModel>>) => {
        if (e.isSuccess) {
          this.roleList = e.data;
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      });
  }

  // 同步用户
  private synchronizationUser() {
    this.userService.synchronizationUser().subscribe((e: ResultModel<SynchronizeModel>) => {
      if (e.isSuccess) {
        const str = '同步成功！\n'
          + '更新' + e.data.updateCount + '条\n'
          + '添加' + e.data.insertCount + '条\n'
          + '总计' + e.data.totalCount + '条\n';
        this.toastrService.success(str, 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  // 添加一条信息
  private createUser() {
    this.userService.createUser(this.userInputModel).subscribe((e: ResultModel<UserOutputModel>) => {
      if (e.isSuccess) {
        this.toastrService.success('添加成功！', 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $('#user-edit').modal('hide');
        this.listUser();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  // 修改一条信息
  private modifyUser() {
    this.userService.modifyUser(this.userInputModel).subscribe((e: ResultModel<UserOutputModel>) => {
      if (e.isSuccess) {
        this.toastrService.success('修改成功！', 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $('#user-edit').modal('hide');
        this.listUser();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  // 删除一条信息
  private removeUser() {
    this.userService.removeUser(this.userID).subscribe((e: ResultModel<number>) => {
      if (e.isSuccess) {
        this.toastrService.success('删除成功！', 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $('#delete').modal('hide');
        this.listUser();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  // 重置密码
  private resetUserPassword() {
    this.userService.resetUserPassword(this.userID).subscribe((e: ResultModel<number>) => {
      if (e.isSuccess) {
        this.toastrService.success('重置成功！', 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $('#delete').modal('hide');
        this.listUser();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  // 绑定修改的值
  private bundingUserEdit() {
    this.userInputModel = new UserInputModel();
    this.editRoles = [];
    this.userOutputModel.userRoleModel.forEach(element => {
      this.editRoles.push(element.roleID);
    });
    $('#userRole').val(this.editRoles);
    this.userInputModel.userID = this.userID;
    this.userInputModel.userNO = this.userOutputModel.userNO;
    this.userInputModel.userName = this.userOutputModel.userName;
    this.userInputModel.organizationID = this.userOutputModel.organizationID;
    this.userInputModel.positionID = this.userOutputModel.positionID;
    this.userInputModel.userType = this.userOutputModel.userType;
    for (let index = 1; index <= 10; index++) {
      this.userInputModel['extend' + index] = this.getJosnOrStr(this.userOutputModel['extend' + index]);
    }
    this.selectExtend();
  }

  // 扩展展示筛选、初始化
  private selectExtend() {
    this.extendEditList = new Array<ExtendOutputModel>();
    this.extendList.forEach(extend => {
      this.editRoles.forEach(roleID => {
        if (extend.roleID === roleID) {
          this.extendEditList.push(extend);
        }
      });
    });
  }

  private getJosnOrStr(str: string) {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  private showWarning(msg: string) {
    this.toastrService.warning(msg, 'Warning!', {
      positionClass: 'toast-top-center',
      timeOut: 3000, closeButton: true
    });
  }

  private jsonOrStrToStr(obj: any) {
    if (obj === undefined || obj === null || obj === '') {
      return ' ';
    }
    if (typeof obj === 'object' && obj.length === 0) {
      return ' ';
    }
    if (typeof obj === 'string') {
      return obj;
    }
    return JSON.stringify(obj);

  }

  private saveError() {
    for (let index = 1; index <= 10; index++) {
      this.userInputModel['extend' + index] = this.getJosnOrStr(this.userInputModel['extend' + index]);
    }
  }
}
