import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {
  
  @Output() deleteClk = new EventEmitter<any>();

  constructor() { }

  deleteClked() {
    this.deleteClk.emit();
  }

  ngOnInit() {
  }

}
