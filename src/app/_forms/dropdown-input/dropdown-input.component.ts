import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Option } from 'src/app/_models/option';

@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.css']
})
export class DropdownInputComponent implements ControlValueAccessor {
  @Input() options: Option[] = [];
  @Input() label = '';
  @Output() valueChanged = new EventEmitter<number>();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  onValueChange() {
    this.valueChanged.emit(this.control.value);
  }
}
