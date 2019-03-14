/**
 * Created by Zoe on 2018/12/29.
 */
import { Component, OnInit, Input, Injectable, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { isNil, remove, reverse } from 'lodash';
import {
  TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';
import { DropdownTreeviewSelectI18n } from './dropdown-treeview-select-i18n';
import { DropdownTreeviewComponent } from "ngx-treeview/src/dropdown-treeview.component";


export class ProductTreeviewConfig extends TreeviewConfig{
  hasAllCheckBox = false;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight = (screenHeight-500);
}
let screenHeight = $(window).height();
@Component({
  selector: 'ngx-dropdown-treeview-select',
  templateUrl: './dropdown-treeview-select.component.html',
  styleUrls: ['./dropdown-treeview-select.component.scss'],
  providers: [
    { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n },
    { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
  ]
})

export class DropdownTreeviewSelectComponent implements OnChanges {

  @Input() dropdownEnabled = true;
  @Input() canSelectParentNode: boolean;
  @Input() config: TreeviewConfig;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;

  filterText: string;
  items: TreeviewItem[];

  private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;

  constructor(
    public i18n: TreeviewI18n
  ) {
    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: true,
    });
    this.dropdownTreeviewSelectI18n = i18n as DropdownTreeviewSelectI18n;
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  select(item: TreeviewItem) {
    if (this.canSelectParentNode) {
      this.selectItem(item);
    }
    else {
      if (item.children === undefined) {
        this.selectItem(item);
      }
    }
  }

  initTree(e): TreeviewItem {
    var childs = new Array<TreeviewItem>();
    if (e.children) {
      e.children.forEach(element => {
        childs.push(this.initTree(element));
      });
      var item = new TreeviewItem({
        text: e.text, value: e.value, children: childs
      });
      return item;
    }
    else {
      var item = new TreeviewItem({
        text: e.text, value: e.value
      });
      return item;
    }
  }

  private updateSelectedItem() {
    if (!isNil(this.items)) {
      const selectedItem = TreeviewHelper.findItemInList(this.items, this.value);
      if (selectedItem) {
        this.selectItem(selectedItem);
      } else {
        this.selectAll();
      }
    }
  }

  private selectItem(item: TreeviewItem) {
    this.dropdownTreeviewComponent.dropdownDirective.close();
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;
      if (this.value !== item.value) {
        this.value = item.value;
        this.valueChange.emit(item.value);
      }
    }
  }

  private selectAll() {
    const allItem = this.dropdownTreeviewComponent.treeviewComponent.allItem;
    this.selectItem(allItem);
  }
}
