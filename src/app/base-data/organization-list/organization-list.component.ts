import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  public departNo: number;

  public departName: string;

  

  constructor() {
    
  }

  ngOnInit() {
  }

  ondeleteClk() {
    alert("删除");
  }

  Depart_edit(){
    this.departNo = 1001
    this.departName = "财务部"
  }

}
