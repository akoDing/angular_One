import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

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
  
  @Output() editClk = new EventEmitter<any>();
  @Output() deleteClk = new EventEmitter<any>();
  @Output() passwordRClk = new EventEmitter<any>();

  constructor(private commonService: CommonService) {}

  editClked() {
    this.editClk.emit();
  }

  deleteClked() {
    this.deleteClk.emit();
  }

  passwordRClked() {
    this.passwordRClk.emit();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.commonService.initCheckBox()
  }
  ngOnChanges() {
  }
}
