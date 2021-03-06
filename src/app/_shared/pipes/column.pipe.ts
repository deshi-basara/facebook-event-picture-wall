import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    const columnArray = [];

    for (let i = args; i < value.length; i+=2) {
      columnArray.push(value[i]);
    }

    return columnArray;
  }

}
