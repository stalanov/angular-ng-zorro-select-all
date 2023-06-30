import { Component, OnInit } from '@angular/core';

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
      [(ngModel)]="selectedValues" 
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
export class NzDemoSelectMultipleComponent implements OnInit {
  options: OptionItem[] = [];
  selectedValues: number[] = [];
  selectedAll = false;

  ngOnInit(): void {
    const options: OptionItem[] = [{ name: 'All', value: ALL_VALUE }];
    for (let i = 10; i < 18; i++) {
      options.push({ name: `${i.toString(36)}${i}`, value: i });
    }
    this.options = options;
  }

  onChange(valueArray: number[]) {
    console.log(this.selectedAll);
    console.log(valueArray);
    if (
      this.selectedValues.includes(0) &&
      !this.selectedAll &&
      valueArray.length > 0
    ) {
      this.selectedValues = [0, ...this.options.map((item) => item.value)];
      this.selectedAll = true;
    } else if (
      !this.selectedValues.includes(0) &&
      this.selectedAll &&
      valueArray.length > 0
    ) {
      this.selectedValues = [];
      this.selectedAll = false;
    } else if (
      this.selectedValues.includes(0) &&
      this.selectedAll &&
      valueArray.length > 0
    ) {
      const index = valueArray.indexOf(0);
      if (index > -1) {
        valueArray.splice(index, 1);
      }
      this.selectedValues = valueArray;
      this.selectedAll = false;
    } else if (valueArray.length === 0) {
      this.selectedAll = false;
    }
  }
}
