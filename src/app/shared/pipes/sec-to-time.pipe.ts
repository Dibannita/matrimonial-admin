import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'secToTime',
  pure: true
})
export class SecToTimePipe implements PipeTransform {

  transform(second: number, type?: string): any {

    if (second) {
      const hours = Math.floor(second / 3600);
      const totalSeconds = second % 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      if (type === 'H:M:S') {
        return `${hours < 10 ? '0' + hours : hours}: ${minutes < 10 ? '0' + minutes : minutes}: ${seconds < 10 ? '0' + seconds : seconds}`;

      } else if('H:M') {
        return `${hours < 10 ? '0' + hours : hours} Hours, ${minutes < 10 ? '0' + minutes : minutes} Min`;

      } else {
        {
          return `${hours < 10 ? '0' + hours : hours} Hours, ${minutes < 10 ? '0' + minutes : minutes} Min, ${seconds < 10 ? '0' + seconds : seconds} Sec`;

        }
      }
    } else {
      return '00: 00: 00';
    }

  }

}
