import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetIdMask'
})
export class AssetIdMaskPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    const separator = args[0] || '-';

    const numbers = value.split(separator);
    let result = numbers
      .slice(0, numbers.length - 1)
      .map(numberStr => '*'.repeat(numberStr.length));
    result.push(numbers[numbers.length - 1]);
    return result.join(separator);
  }

}
