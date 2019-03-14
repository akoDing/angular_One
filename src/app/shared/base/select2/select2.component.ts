import { ServerTimeoutException } from './../../exception/server-timeout.exception';
import {
  Component, ViewChild, ElementRef, forwardRef
  , Input, Output, EventEmitter, SimpleChanges, Renderer
  , OnInit, AfterViewInit, OnChanges, OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-select2',
  template: `
      <select #selectControll [disabled]="disabled" style="width:100%">
        <ng-content select="option, optgroup">
        </ng-content>
      </select>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LSelect2Component),
    multi: true
  }]
})

export class LSelect2Component implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {

  @ViewChild('selectControll')
  selectControll: ElementRef;

  @Input()
  data: Array<any>;

  @Input()
  disabled: boolean;

  @Input()
  options: any = {};

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  selectedValue: any | Array<any>;
  _jqueryElement: any;

  _onChange = (_: any) => { };
  _onTouched = () => { };

  constructor(
    private _renderer: Renderer) {

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this._jqueryElement = $(this.selectControll.nativeElement);
    this.initSelect2();

    this._jqueryElement.on('select2:select select2:unselect', (e: any) => {
      let data = this._jqueryElement.select2('data');
      for (const item of data) {
        delete item.element;
        delete item.disabled;
        delete item.selected;
      }
      if (!this.options.multiple) {
        data = (e.type === 'select2:unselect') ? null : data;
      }
      this._onChange(data);
      this.valueChange.emit(data);
    });
    if (this.selectedValue) {
      this.setSelect2Value(this.selectedValue);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._jqueryElement) { return; }
    if (this.hasChanged(changes)) {
      this.initSelect2();
      if (this.selectedValue) {
        this.setSelect2Value(this.selectedValue);
      }
    }
  }

  ngOnDestroy() {
    this._jqueryElement.select2('destroy');
  }

  writeValue(value: any | Array<any>): void {
    this.selectedValue = value;
    if (value !== null && value !== undefined) {
      this.setSelect2Value(value);
    }
  }

  registerOnChange(fn: (_: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  initSelect2() {
    if (this._jqueryElement.hasClass('select2-hidden-accessible') === true) {
      this._jqueryElement.select2('destroy');
      this._renderer.setElementProperty(this.selectControll.nativeElement, 'innerHTML', '');
    }
    const options: any = {
      data: this.data
    };
    if (this.options.text && this.data) {
      options.data = new Array<any>();
      this.data.forEach(item => {
        const optionModel: any = new Object();
        optionModel['text'] = item[this.options.text];
        optionModel['id'] = item[this.options.id];
        options.data.push(optionModel);
      });
    }
    Object.assign(options, this.options);
    this._jqueryElement.select2(options);
  }

  setSelect2Value(value: any | Array<any>) {
    if (!this._jqueryElement || !value) {
      this.selectedValue = value;
      return;
    }
    // 双向绑定的值为list
    let targetVal = value['id'] || value;
    if (Array.isArray(value)) {
      targetVal = value;
    }
    this._jqueryElement.val(targetVal).trigger('change');
  }

  private hasChanged(changes: any) {
    if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
      return true;
    }
    if (changes['options'] && JSON.stringify(changes['options'].previousValue) !== JSON.stringify(changes['options'].currentValue)) {
      return true;
    }
    return false;
  }
}
