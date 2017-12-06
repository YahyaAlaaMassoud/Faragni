import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRatingPipe'
})
export class StarRatingPipePipe implements PipeTransform {

  transform(value, args: string[]) : any {
    let res = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }

}
