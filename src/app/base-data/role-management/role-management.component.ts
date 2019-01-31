import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  oneditClk() {
  	alert("角色管理页面编辑按钮");
  }

  ondeleteClk() {
    // 判断是哪一个删除按钮
  	alert("角色管理页面删除按钮");
  }

}
