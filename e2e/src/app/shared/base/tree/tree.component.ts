import { Component, OnInit, Input, Injectable, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { isNil, remove, reverse } from 'lodash';
import {
  TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';
import { CommonService } from 'src/app/shared/services/common.service';


@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig{
  hasAllCheckBox = true;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight = (screenHeight-300);
}
let screenHeight = $(window).height();
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
  ]
})


export class TreeComponent implements OnInit, OnChanges {

  @Input() items: TreeviewItem[]; 
  @Input() canSelectParentNode: boolean;
  @Output() valueChange = new EventEmitter<any>();

  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;

  rows: string[];

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
  }
  ngOnChanges() {
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
    this.rows = [];
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!isNil(parent)) {
        texts.push(parent.item.text);
        parent = parent.parent;
      }
      const reverseTexts = reverse(texts);
      const row = `${reverseTexts.join(' -> ')} : ${value}`;
      this.rows.push(row);
    });
      // console.log(this.rows)
      return this.rows
  }

  removeItem(item: TreeviewItem) {
    let isRemoved = false;
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        remove(this.items, item);
      } else {
        isRemoved = TreeviewHelper.removeItem(tmpItem, item);
        if (isRemoved) {
          break;
        }
      }
    }

    if (isRemoved) {
      this.treeviewComponent.raiseSelectedChange();
    }
  }

  select(item) {
    if (this.canSelectParentNode) {
      this.valueChange.emit(item);
    }
    else {
      if (item.children === undefined) {
        this.valueChange.emit(item);
      }
    }
  }

}
