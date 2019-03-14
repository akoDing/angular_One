import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
import { TreeComponent } from '../../shared/base/tree/tree.component';
import { RoleModel, RoleOutputModel, RoleInputModel } from 'src/app/shared/model/role.model';
import { RightModel, RightOutputModel, RightInputModel } from 'src/app/shared/model/right.model';
import { RoleRightModel, RoleRightOutputModel, RoleRightInputModel } from 'src/app/shared/model/roleRight.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { RoleRightService } from 'src/app/shared/services/roleRight.service';
import { ResultModel } from 'src/app/shared/model/result.model';
import { ToastrService } from 'ngx-toastr';
import { a } from '@angular/core/src/render3';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-role-authorization',
  templateUrl: './role-authorization.component.html',
  styleUrls: ['./role-authorization.component.scss']
})

export class RoleAuthorizationComponent implements OnInit, AfterViewInit {
  @ViewChild(TreeComponent)
  private TreeComponent: TreeComponent;
  item: TreeviewItem[];
  rows: string[];
  selectedRoleID: string;
  selectedRoleName: string;

  roles: Array<RoleOutputModel>;
  rights: Array<RightOutputModel>;
  rolerightList: Array<RoleRightOutputModel>;
  constructor(private roleService: RoleService, private roleRightService: RoleRightService,
    private toastrService: ToastrService) {
    this.roles = new Array<RoleOutputModel>();
    this.rights = new Array<RightOutputModel>();
    this.item = new Array();
  }

  ngAfterViewInit() {
  }

  onsaveClk() {
    const input = new Array<RoleRightInputModel>();
    if(this.TreeComponent.rows.length==0){
      const a = new RoleRightInputModel();
     
      a.roleID = this.selectedRoleID;
      input.push(a);
    }

    for (let item of this.TreeComponent.rows) {
      const a = new RoleRightInputModel();
      a.rightID = item;
      a.roleID = this.selectedRoleID;
      input.push(a);
    }
    this.roleRightService.setRoleRight(input).subscribe((e: ResultModel<Array<RoleRightOutputModel>>) => {
      if (e.isSuccess) {
        this.toastrService.success("授权成功！", 'Success!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
        this.rolerightList = e.data;
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });

  }

  ngOnInit() {
    this.getRoleList();

  }

  getRoleList() {
    this.roleService.listRole(new RoleInputModel()).subscribe((e: ResultModel<Array<RoleOutputModel>>) => {
      if (e.isSuccess) {
        this.roles = e.data;
        if (e.data.length > 0) {
          this.onRoleClick(this.roles[0]);
        }
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });
  }
  getRightList(roleids: Array<string>) {

    this.roleRightService.listRight(roleids).subscribe((e: ResultModel<Array<RightOutputModel>>) => {
      if (e.isSuccess) {
        this.rights = e.data;
        console.log(this.rights);

        this.getTree();
      } else {
        this.toastrService.error(e.errorMessage, 'Error!', {
          positionClass: 'toast-top-center',
          timeOut: 3000, closeButton: true
        });
      }
    });

  }
  onRoleClick(item: RoleModel) {
    //给权限树赋值
    this.item = new Array();
    this.selectedRoleID = item.roleID;
    this.selectedRoleName = item.roleName;
    const roleids = new Array<string>();
    roleids.push(item.roleID);
    this.getRightList(roleids);
    //console.log(JSON.stringify(this.rights));
  }
  getTree() {
    while (this.rights.length > 0) {
      const right = this.rights.pop();

      const currentModule = this.item.find((e) => e.value === right.moduleID);
      if (currentModule) {
        const currentMenu = currentModule.children.find((e) => e.value === right.menuID);
        if (currentMenu) {
          currentMenu.children.push(new TreeviewItem({
            text: right.rightName, value: right.rightID, checked: right.isChecked
          }));
        } else {
          currentModule.children.push(new TreeviewItem({
            text: right.menuName, value: right.menuName, children: [
              {
                text: right.rightName, value: right.rightID, checked: right.isChecked
              }
            ]
          }));
        }
      } else {
        const treeitem = new TreeviewItem({
          text: right.moduleName, value: right.moduleID, children: [
            {
              text: right.menuName, value: right.menuName, children: [
                {
                  text: right.rightName, value: right.rightID, checked: right.isChecked
                }
              ]
            }
          ]
        });
        this.item.push(treeitem);
      }
    }
  }

}

