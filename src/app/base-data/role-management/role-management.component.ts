import { Component, OnInit } from '@angular/core';
import { UserInputModel, UserOutputModel } from 'src/app/shared/model/user.model';
import { UserRoleInputModel, UserRoleOutputModel } from 'src/app/shared/model/userRole.model';
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
import { ExtendOutputModel, ExtendModel } from 'src/app/shared/model/extend.model';
import { RoleInputModel, RoleOutputModel } from 'src/app/shared/model/role.model';
import { UserRoleService } from 'src/app/shared/services/userRole.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  // 当前操作UserID
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

  // 查询role条件
  queryConditionForRole: RoleInputModel;
  // 绑定List的角色list变量
  roleLists: Array<RoleOutputModel>;
  // 需删除的UserRoleIDList
  userRoleIDList: Array<string>;
  // 操作role用到的参数
  roleIDByEdit: string;
  roleInputModel: RoleInputModel;
  roleOutputModel: RoleOutputModel;
  // 标识是否为删除role操作；
  isRemoveRole: boolean;
  // 返回的多条信息
  standardsAllToRole: PageModel<UserOutputModel>;
  // 操作的UserList
  standardsByRoleEdit: Array<UserInputModel>;

  // 列表扩展展示list
  extendEditLists: Array<ExtendOutputModel>;
  queryConditionByRoleEdit: UserInputModel;
  userRoleInputModel: UserRoleInputModel;
  userRoles: Array<UserRoleInputModel>;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private organizationService: OrganizationService,
    private positionService: PositionService,
    private extendService: ExtendService,
    private roleService: RoleService,
    private userRoleService: UserRoleService,
  ) {
    this.standards = new PageModel<UserOutputModel>();
    this.queryCondition = new UserInputModel();
    this.queryCondition.pageNO = 1;
    this.userInputModel = new UserInputModel();
    this.organizationList = new Array<OrganizationOutputModel>();
    this.queryConditionForRole = new RoleInputModel();
    this.queryConditionForRole.isPim = null;
    this.roleInputModel = new RoleInputModel();
    this.extendEditLists = new Array<ExtendOutputModel>();
    this.queryConditionByRoleEdit = new UserInputModel();
    this.queryConditionByRoleEdit.pageNO = 1;
    this.queryConditionByRoleEdit.pageSize = 10;
    this.standardsAllToRole = new PageModel<UserOutputModel>();
  }

  ngOnInit() {
    $('.select2').select2({
      theme: 'default'
    });
    // 初始化话列表数据
    this.listOrganization();
    this.listPosition();
    this.listExtend();
    this.listRole();
    this.listRoles();
  }

  // 分页
  onPageChange(pageNO) {
    this.queryCondition.pageNO = pageNO;
    this.listUser();
  }

  // 修改事件
  oneditClk(event) {
    this.userID = event;
    this.userInputModel = new UserInputModel();
    this.editRoles = [];
    this.extendEditList = new Array<ExtendOutputModel>();
    this.getUser();
  }

  // 获取删除操作的userRoleID(单条)
  onBundingdeleteClk(event) {
    this.userRoleIDList = [];
    event.userRoleModel.forEach(item => {
      if (item.roleID === this.roleID) {
        this.userRoleIDList.push(item.userRoleID);
      }
    });
    this.isRemoveRole = false;
  }

  // 获取删除操作的userRoleID(多条)
  onRemoveUserRoleList() {
    this.userRoleIDList = [];
    let userIDList: Array<string>;
    userIDList = [];
    if ($('input[name="select-user"]:checked').val() === undefined) {
      this.toastrService.warning('请勾选用户', 'Warning!', {
        positionClass: 'toast-top-center',
        timeOut: 3000, closeButton: true
      });
      return;
    }
    $('#delete').modal('show');
    $.each($('input[name="select-user"]:checked'), function () {
      userIDList.push($(this).val());
    });
    this.standards.listData.forEach(user => {
      userIDList.forEach(userid => {
        if (user.userID === userid) {
          user.userRoleModel.forEach(userRole => {
            if (userRole.roleID === this.roleID) {
              this.userRoleIDList.push(userRole.userRoleID);
            }
          });
        }
      });
    });
    this.isRemoveRole = false;
  }

  // 获取删除操作的RoleID
  onRemoveRole(roleID: string) {
    this.isRemoveRole = true;
    this.roleIDByEdit = roleID;
  }

  // 获取修改操作的RoleID
  onEditRole(roleID: string) {
    this.roleIDByEdit = roleID;
    this.getRole();
  }

  // 确认删除事件
  ondeleteClk() {
    if (this.isRemoveRole) {
      this.removeRole();
    } else {
      this.userRoleList = new Array<UserRoleInputModel>();
      this.userRoleIDList.forEach(item => {
        this.userRole = new UserRoleInputModel();
        this.userRole.userRoleID = item;
      });
      this.removeUserRole();
    }
  }

  // 保存事件(单条)
  onSaveUser() {
    if (this.userID !== null) {
      this.userInputModel.userID = this.userID;
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
      this.modifyUser();
      this.saveError();
    }
  }

  // 查询角色
  onSelectRole() {
    this.listRoles();
  }

  // 单击角色查询用户
  onSelectUser(roleID: string) {
    this.roleID = roleID;
    this.onListSelect();
  }

  // 批量添加事件
  onSelectUserAll() {
    this.listUserAllByEdit();
    this.selectExtendList();
  }
  get getTableWidth() {
    return '500px';
  }
  onSaveRole() {
    if (this.roleInputModel.roleName === '') {
      this.toastrService.warning('角色名不能为空', 'Warning!', {
        positionClass: 'toast-top-center',
        timeOut: 3000, closeButton: true
      });
      return;
    }
    this.modifyRole();
  }

  // usereditlist分页
  onPageChangeByEdit(pageNO) {
    this.queryConditionByRoleEdit.pageNO = pageNO;
    this.listUserAllByEdit();
  }
  // 批量添加页面查询
  onListSelectEditExtend() {
    this.listUserAllByEdit();
  }
  // 批量添加保存事件
  onSaveExtend() {
    this.userRoles = new Array<UserRoleInputModel>();
    this.standardsByRoleEdit.forEach(item => {
      if (item['isChecked']) {
        this.userRoleInputModel = new UserRoleInputModel();
        this.userRoleInputModel.userID = item.userID;
        this.userRoleInputModel.roleID = this.roleID;
        this.userRoleInputModel.extendModels = new Array<ExtendModel>();
        for (let index = 1; index <= 10; index++) {
          const extendData: string = this.jsonOrStrToStr(item['extend' + index]);
          if (extendData !== ' ') {
            const extendModel: ExtendModel = new ExtendModel();
            extendModel.extendNo = 'Extend' + index;
            extendModel.extendData = extendData;
            this.userRoleInputModel.extendModels.push(extendModel);
          }
        }
        this.userRoles.push(this.userRoleInputModel);
      }
    });
    if (this.userRoles.length === 0) {
      this.toastrService.warning('请勾选用户', 'Warning!', {
        positionClass: 'toast-top-center',
        timeOut: 3000, closeButton: true
      });
      return;
    }
    this.createUserRole();
  }

  // 条件查询User事件
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
    if (list !== null) {
      list.forEach(element => {
        this.userInputModel[extendNO].push(element.id);
      });
    }
  }

  // 选择扩展字段事件
  onExtendListChange(extendNO: string, user: UserInputModel) {
    const list = user[extendNO];
    user[extendNO] = [];
    if (list !== null) {
      list.forEach(element => {
        user[extendNO].push(element.id);
      });
    }
  }

  // 查询单条User信息
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

  // 查询多条User信息
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

  // 查询所有角色(editUser用)
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

  // 条件查询所有角色
  private listRoles() {
    this.roleService.listRole(this.queryConditionForRole)
      .subscribe((e: ResultModel<Array<RoleOutputModel>>) => {
        if (e.isSuccess) {
          this.roleLists = e.data;
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

  // 删除角色关系信息
  private removeUserRole() {
    this.userRoleService.removeUserRole(this.userRoleIDList).subscribe((e: ResultModel<number>) => {
      if (e.isSuccess) {
        this.toastrService.success('删除关系成功！', 'Success!', {
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
      this.editRoles.forEach(roleid => {
        if (extend.roleID === roleid) {
          this.extendEditList.push(extend);
        }
      });
    });
  }

  // ListTable扩展展示筛选、初始化
  private selectExtendList() {
    this.extendEditLists = new Array<ExtendOutputModel>();
    this.extendList.forEach(extend => {
      if (extend.roleID === this.roleID) {
        this.extendEditLists.push(extend);
      }
    });
  }

  private getJosnOrStr(str: string) {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  private getRole() {
    this.roleService.getRole(this.roleIDByEdit).subscribe((e: ResultModel<RoleOutputModel>) => {
      if (e.isSuccess) {
        this.roleOutputModel = e.data;
        this.roleInputModel.roleID = this.roleOutputModel.roleID;
        this.roleInputModel.roleName = this.roleOutputModel.roleName;
        this.roleInputModel.isPim = this.roleOutputModel.isPim;
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  private modifyRole() {
    this.roleService.modifyRole(this.roleInputModel).subscribe((e: ResultModel<RoleOutputModel>) => {
      if (e.isSuccess) {
        this.toastrService.success('修改成功！', 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $('#role-edit').modal('hide');
        this.listRoles();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  private removeRole() {
    const listID: Array<string> = [this.roleIDByEdit];
    this.roleService.removeRole(listID).subscribe((e: ResultModel<RoleOutputModel>) => {
      if (e.isSuccess) {
        this.roleOutputModel = e.data;
        this.toastrService.success('删除角色成功', 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $('#delete').modal('hide');
        this.listRoles();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }

  private listUserAllByEdit() {
    this.userService.listUser(this.queryConditionByRoleEdit)
      .subscribe((e: ResultModel<PageModel<UserOutputModel>>) => {
        if (e.isSuccess) {
          this.standardsAllToRole = e.data;
          // string to json and output to input
          this.standardsByRoleEdit = new Array<UserInputModel>();
          this.standardsAllToRole.listData.forEach(user => {
            this.standardsByRoleEdit.push(this.outputModelToInputModelByUser(user));
          });
        } else {
          this.toastrService.error(e.errorMessage, 'Error!', {
            positionClass: 'toast-top-center',
            timeOut: 3000, closeButton: true
          });
        }
      });
  }

  private saveError() {
    for (let index = 1; index <= 10; index++) {
      this.userInputModel['extend' + index] = this.getJosnOrStr(this.userInputModel['extend' + index]);
    }
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

  private outputModelToInputModelByUser(model: UserOutputModel) {
    const user = new UserInputModel();
    user.userID = model.userID;
    user.userNO = model.userNO;
    user.userName = model.userName;
    user.organizationID = model.organizationID;
    user.positionID = model.positionID;
    user.userType = model.userType;
    user.userRoleModel = model.userRoleModel;
    for (let index = 1; index <= 10; index++) {
      user['extend' + index] = this.getJosnOrStr(model['extend' + index]);
    }
    user['isChecked'] = false;
    return user;
  }

  private createUserRole() {
    this.userRoleService.createUserRole(this.userRoles).subscribe((e: ResultModel<Array<UserRoleOutputModel>>) => {
      if (e.isSuccess) {
        this.toastrService.success('修改成功！', 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        $('#batchAdd').modal('hide');
        this.listUser();
        this.listUserAllByEdit();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }
}
