import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  
  constructor() { }


  oneditClk() {
  	alert("用户管理页面编辑按钮");
  }

  ondeleteClk() {
  	alert("用户管理页面删除按钮");
  }

  onpasswordRClk() {
  	alert("用户管理页面密码重置按钮");
  }


  ngOnInit() {
    $('.select2').select2({
      theme: "default"
    })
  }

}
