import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
import { TreeComponent } from '../../shared/base/tree/tree.component';

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
  constructor() { }
  ngAfterViewInit() {
    
  }
  onsaveClk() {
    console.log(this.TreeComponent.rows)
  }
  
  ngOnInit() {
    this.item = new Array();
  	const itCategory = new TreeviewItem({
    text: 'IT', value: 9, children: [
       {
           text: 'Programming', value: 91, children: [{
               text: 'Frontend', value: 911, children: [
                   { text: 'Angular 1', value: 9111 },
                   { text: 'Angular 2', value: 9112 },
                   { text: 'ReactJS', value: 9113 }
               ]
           }, {
               text: 'Backend', value: 912, children: [
                   { text: 'C#', value: 9121 },
                   { text: 'Java', value: 9122 },
                   { text: 'Python', value: 9123, checked: false }
               ]
           }]
       },
       {
           text: 'Networking', value: 92, children: [
               { text: 'Internet', value: 921 },
               { text: 'Security', value: 922 }
           ]
       }
      ]
    })

    const teenCategory = new TreeviewItem({
            text: 'Teen', value: 2, children: [
                { text: 'Adventure', value: 21 },
                { text: 'Science', value: 22 }
            ]
        })
  	this.item.push(itCategory, teenCategory);
  }
}
