import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
})
export class CuttextPipe implements PipeTransform {
  transform(str: string): string {
    return str.split(' ').slice(0, 3).join(' ');
  }
}
