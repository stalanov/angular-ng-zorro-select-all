import { Component } from '@angular/core';

type OptionItem = {
  name: string;
  value: number;
};

const ALL_VALUE = 0;

@Component({
  selector: 'nz-demo-select-multiple',
  template: `
    <nz-select style="width:500px"
      [nzMaxTagCount]="5"
      [nzMaxTagPlaceholder]="tagPlaceHolder"
      [nzMode]="'multiple'"
      [nzPlaceHolder]="'Please select'"
      [(ngModel)]="modelValues" 
      [nzAllowClear]="true"
      (ngModelChange) ="onChange($event)"
    >
      <nz-option *ngFor="let item of options" [nzLabel]="item.name" [nzValue]="item.value"></nz-option>
    </nz-select>

    <ng-template #tagPlaceHolder let-selectedList>and {{ selectedList.length }}</ng-template>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
        height:30px;
      }
    `,
  ],
})
export class NzDemoSelectMultipleComponent {
  allItem: OptionItem = { name: 'All', value: ALL_VALUE };
  options: OptionItem[] = [];
  modelValues: number[] = [];
  selectedValues: number[] = [];
  allSelected = false;
  allValues: number[] = [];

  constructor() {
    const options: OptionItem[] = [];
    for (let i = 11; i < 19; i++) {
      options.push({ name: `${i.toString(36)}${i}`, value: i });
    }
    this.options = [this.allItem, ...options];
    this.allValues = options.map((item) => item.value);
  }

  onChange(): void {
    const allItemSelected = this.modelValues.includes(ALL_VALUE);

    if (this.allSelected) {
      allItemSelected ? this.deselectAllItem() : this.deselectAll();
    } else {
      allItemSelected ? this.selectAll() : this.selectItems();
    }

    console.log(this.selectedValues);
  }

  private selectAll(): void {
    this.modelValues = [this.allItem.value, ...this.allValues];
    this.selectedValues = this.allValues;
    this.allSelected = true;
  }

  private deselectAll(): void {
    this.modelValues = [];
    this.selectedValues = [];
    this.allSelected = false;
  }

  private deselectAllItem(): void {
    this.modelValues = this.modelValues.slice(1);
    this.selectedValues = this.modelValues;
    this.allSelected = false;
  }

  private selectItems(): void {
    this.selectedValues = this.modelValues;

    if (this.modelValues.length === this.allValues.length) {
      this.modelValues = [this.allItem.value, ...this.modelValues];
      this.allSelected = true;
    }
  }
}
