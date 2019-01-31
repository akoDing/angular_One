import {
    Component, Input, HostListener, AfterViewInit, OnDestroy,
    SimpleChanges, OnChanges, HostBinding, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
};

@Component({
    selector: 'app-datepicker',
    providers: [CUSTOM_ACCESSOR],
    template: `
        <div class="ng2-datetime">
            <div [ngClass]="{ 'form-group': !datepickerOptions.hideIcon, 'date': true }">
                <div [ngClass]="{ 'input-group': !datepickerOptions.hideIcon, 'date': true }">
                    <input id="{{idDatePicker}}" type="text" class="form-control"
                        [disabled] = "disabled"
                        [attr.readonly]="readonly"
                        [attr.required]="required"
                        [attr.placeholder]="datepickerOptions.placeholder || '选择查询年月'"
                        [attr.tabindex]="tabindex"
                        [(ngModel)]="dateModel"
                        (blur)="onTouched()"
                        (keyup)="checkEmptyValue($event)"/>
                    <div [hidden]="datepickerOptions.hideIcon || datepickerOptions === false"
                        (click)="showDatepicker(disabled)"
                        class="input-group-addon">
                        <i [ngClass]="datepickerOptions.icon || 'fa fa-calendar'"></i>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        '.ng2-datetime *[hidden] { display: none; }'
    ]
})

export class DatePickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {
    @Input('datepickerOptions') datepickerOptions: any = {};
    @Input() disabled: boolean;
    @Input() readonly: boolean;
    @Input() required: boolean;
    @Input() tabindex: string;

    date: Date; // ngModel
    dateModel: string;

    // instances
    datepicker: any;

    idDatePicker: string = uniqueId('q-datepicker_');

    onChange = (_: any) => {
    }

    @HostListener('blur')
    onTouched = () => {
    }

    @HostBinding('attr.tabindex')
    get tabindexAttr(): string | undefined {
        return this.tabindex === undefined ? '-1' : undefined;
    }

    ngAfterViewInit() {
        this.init();
    }

    ngOnDestroy() {
        if (this.datepicker) {
            this.datepicker.datepicker('destroy');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            if (changes['datepickerOptions'] && this.datepicker) {
                this.datepicker.datepicker('destroy');

                if (changes['datepickerOptions'].currentValue) {
                    this.datepicker = null;
                    this.init();
                } else if (changes['datepickerOptions'].currentValue === false) {
                    this.datepicker.remove();
                }
            }
        }
    }

    writeValue(value: any) {
        this.date = value;
        if (isDate(this.date)) {
            setTimeout(() => {
                this.updateModel(this.date);
            }, 0);
        } else {
            this.clearModels();
        }
    }

    registerOnChange(fn: (_: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    checkEmptyValue(e: any) {
        const value = e.target.value;
        if (value === '' && (
            this.datepickerOptions === false ||
            (this.dateModel === '')
        )) {
            this.onChange(undefined);
        }
    }

    clearModels() {
        this.onChange(undefined);
        this.updateDatepicker(null);
    }

    showDatepicker(disabled: boolean) {
        if (!disabled) {
            this.datepicker.datepicker('show');
        }
    }

    private init(): void {
        if (!this.datepicker && this.datepickerOptions !== false) {
            const options = jQuery.extend({ enableOnReadonly: !this.readonly }, this.datepickerOptions);
            this.datepicker = (<any>$('#' + this.idDatePicker)).datepicker(options);
            this.datepicker
                .on('changeDate', (e: any) => {
                    const newDate: Date = e.date;
                    if (isDate(this.date) && isDate(newDate)) {
                        // get hours/minutes
                        newDate.setHours(this.date.getHours());
                        newDate.setMinutes(this.date.getMinutes());
                        newDate.setSeconds(this.date.getSeconds());
                    }

                    this.date = newDate;
                    this.onChange(newDate);
                });
        } else if (this.datepickerOptions === false) {
            (<any>$('#' + this.idDatePicker)).remove();
        }

        this.updateModel(this.date);
    }

    private updateModel(date: Date): void {
        this.updateDatepicker(date);
    }

    private updateDatepicker(date?: any) {
        if (this.datepicker !== undefined) {
            this.datepicker.datepicker('update', date);
        }
    }

    private pad(value: any): string {
        return value.toString().length < 2 ? '0' + value : value.toString();
    }
}

let id = 0;
function uniqueId(prefix: string): string {
    return prefix + ++id;
}

function isDate(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}
