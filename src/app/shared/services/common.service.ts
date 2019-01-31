/**
 * Created by Zoe on 2018/12/21.
 */
import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {
  }

  initCheckBox() {
  	$('input[type="checkbox"], input[type="radio"]').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass   : 'iradio_minimal-blue'
    })
  }
}
