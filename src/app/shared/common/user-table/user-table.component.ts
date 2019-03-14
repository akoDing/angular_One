import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserOutputModel } from 'src/app/shared/model/user.model';
import { PageModel } from 'src/app/shared/model/page.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @Input() isShowCheck: boolean = true;
  @Input() isShowNumber: boolean = true;
  @Input() isShowName: boolean = true;
  @Input() isShowDepart: boolean = true;
  @Input() isShowPosition: boolean = true;
  @Input() isShowRole: boolean = true;
  @Input() isShowState: boolean = true;
  @Input() isShowOperation: boolean = true;
  @Input() isShowpasswordBtn: boolean = true;
  @Input() dataList: PageModel<UserOutputModel> = new PageModel<UserOutputModel>();

  @Output() editClk = new EventEmitter<any>();
  @Output() deleteClk = new EventEmitter<any>();
  @Output() passwordRClk = new EventEmitter<any>();

  constructor(private commonService: CommonService) { }

  editClked(userid: string) {
    this.editClk.emit(userid);
  }

  passwordRClked(userid: string) {
    this.passwordRClk.emit(userid);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.commonService.initCheckBox();
  }

  ngOnChanges() {
  }

  onBundingDeleteID(user: UserOutputModel) {
    this.deleteClk.emit(user);
  }
}
