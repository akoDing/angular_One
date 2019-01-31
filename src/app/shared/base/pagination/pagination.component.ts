import { Component, OnInit, ElementRef, Output, Input, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  isShowtitle = true;

  rotate = true;

  //maxSize: number = 5;

  //展示列表页数
  @Input() maxSize: number = 5;

  //每页展示条数
  totalItems: number;

  pageNO: number = 1;
  //总条数
  @Input() totalPage: number;
  //当前页码
  @Input() currentPage: number;
  //定义发射器，当页码变化时候，将变化后的数据发射出去，供监听者接收使用
  @Output() pageChanges: EventEmitter<number> = new EventEmitter<number>();

  pageChanged(event: any): void {
    //通过发射器发射数据，数据包含在event中
    this.pageChanges.emit(event.page);
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.totalItems = this.totalPage * 10;
  }


  setPage() {
    this.currentPage = this.pageNO;
  }
}


